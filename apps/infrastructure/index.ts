import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
import * as aws from "@pulumi/aws";

// load config
let config = new pulumi.Config("simse");

// create and validate ACM certificate
const certificate = new aws.acm.Certificate("simse", {
    domainName: config.require("domain"),
    validationMethod: "DNS"
});

// create validation records
certificate.domainValidationOptions.apply((opts) => {
    return opts.map((opt) => {
        return new cloudflare.Record(opt.resourceRecordName, {
            name: opt.resourceRecordName,
            zoneId: config.require("zoneId"),
            type: opt.resourceRecordType,
            value: opt.resourceRecordValue,
            ttl: 3600,
            proxied: false
        });
    });
});

// create CloudFront distribution
const distribution = new aws.cloudfront.Distribution("simse", {
    enabled: true,
    isIpv6Enabled: true,
    origins: [{
        domainName: config.require("rootHost"),
        originShield: {
            enabled: true,
            originShieldRegion: "eu-central-1"
        },
        originId: "app-www",
        customOriginConfig: {
            originProtocolPolicy: "https-only",
            httpPort: 80,
            httpsPort: 443,
            originSslProtocols: ["TLSv1.2"]
        },
        
    }],
    defaultCacheBehavior: {
        allowedMethods: ["GET", "HEAD", "OPTIONS"],
        cachedMethods: ["GET", "HEAD", "OPTIONS"],
        targetOriginId: "app-www",
        viewerProtocolPolicy: "redirect-to-https",
        cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad",
        compress: true
    },
    orderedCacheBehaviors: [
        {
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD", "OPTIONS"],
            pathPattern: "_astro/*",
            targetOriginId: "app-www",
            viewerProtocolPolicy: "allow-all",
            cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
            compress: true
        },
        {
            allowedMethods: ["GET", "HEAD", "OPTIONS"],
            cachedMethods: ["GET", "HEAD", "OPTIONS"],
            pathPattern: "static/*",
            targetOriginId: "app-www",
            viewerProtocolPolicy: "allow-all",
            cachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
            compress: true
        }
    ],
    viewerCertificate: {
        cloudfrontDefaultCertificate: true,
        acmCertificateArn: certificate.arn,
        sslSupportMethod: "sni-only"
    },
    restrictions: {
        geoRestriction: {
            restrictionType: "none"
        }
    },
    httpVersion: "http2and3",
    waitForDeployment: false,
    aliases: [config.require("domain")],
})

// find zone by domain
const zone = cloudflare.getZone({
    name: config.require("domain")
});

// domain records
new cloudflare.Record("@", {
    name: "@",
    zoneId: zone.then(zone => zone.id),
    type: "CNAME",
    value: distribution.domainName,
    ttl: 3600,
    proxied: false
});