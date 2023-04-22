terraform {
    required_providers {
        cloudflare = {
            source = "cloudflare/cloudflare"
            version = "4.3.0"
        }

        fly = {
            source = "fly-apps/fly"
            version = "0.0.21"
        }
    }

    backend "consul" {
        address = "100.72.238.121:8500"
        scheme  = "http"
        path    = "terraform/simse.io"
    }

    required_version = ">= 1.2.0"
}

provider "cloudflare" {
}

provider "fly" {
    useinternaltunnel    = true
    internaltunnelorg    = "personal"
    internaltunnelregion = "lhr"
}

# fly app
resource "fly_app" "app" {
    name = "simse-${var.env}"
}

resource "fly_cert" "apexCert" {
    app = fly_app.app.id
    hostname = "${var.domain}"
}

resource "fly_ip" "dedicatedIpv4" {
    app = fly_app.app.id
    type = "v4"
}

resource "fly_ip" "dedicatedIpv6" {
    app = fly_app.app.id
    type = "v6"
}

resource "fly_machine" "node" {
    for_each = {
        for index, region in var.regions:
        region.name => region
    }
    region = each.value.name
    cpus = each.value.cpus
    cputype = each.value.cputype
    memorymb = each.value.memorymb

    # global
    app = fly_app.app.id
    image = "${var.app_image}"
    services = [
        {
            ports = [
                {
                    port     = 443
                    handlers = ["tls", "http"]
                },
                {
                    port     = 80
                    handlers = ["http"]
                }
            ],
            protocol : "tcp",
            internal_port : 3000
        }
    ]
    mounts = [
        {
            volume = fly_volume.databaseVolume[each.value.name].id
            path = "/var/lib/litefs"
        }
    ]
    env = {
        DATABASE_URL = "/litefs/simse.db"
        WORDPRESS_URL="https://simse-wp.sorensen.cloud/wp-json/wp/v2/"
        SIMSE_IO_HOST="simse.dev"
        # SIMON_SORENSEN_COM_HOST="simon-sorensen.local:3000"
        REDIS_URL="100.79.200.93:6379"
        REDIS_DATABASE=1
    }
}

resource "fly_volume" "databaseVolume" {
    for_each = {
        for index, region in var.regions:
        region.name => region
    }
    region = each.value.name
    app = fly_app.app.id
    size = 1
    name = "litefs"
}

# find zone id
data "cloudflare_zone" "zone" {
    name = "${var.domain}"
    account_id = "ffa300f532eaaec071135605899f7bf8"
}

/*
resource "cloudflare_zone_settings_override" "zoneSettings" {
    zone_id = data.cloudflare_zone.zone.id

    settings {
        always_online = "off"
        security_level = "essentially_off"
        brotli = "on"
        challenge_ttl = 31536000 # 1 year
    }
}*/

resource "cloudflare_record" "apexv4" {
    zone_id = data.cloudflare_zone.zone.id
    name    = "@"
    type    = "A"
    value   = fly_ip.dedicatedIpv4.address
    proxied = false
}

resource "cloudflare_record" "apexv6" {
    zone_id = data.cloudflare_zone.zone.id
    name    = "@"
    type    = "AAAA"
    value   = fly_ip.dedicatedIpv6.address
    proxied = false
}

resource "cloudflare_record" "learnSubdomainv4" {
    zone_id = data.cloudflare_zone.zone.id
    name    = "learn"
    type    = "A"
    value   = fly_ip.dedicatedIpv4.address
    proxied = false
}

resource "cloudflare_record" "learnSubdomainv6" {
    zone_id = data.cloudflare_zone.zone.id
    name    = "learn"
    type    = "AAAA"
    value   = fly_ip.dedicatedIpv6.address
    proxied = false
}

resource "cloudflare_record" "apexCertVerification" {
    zone_id = data.cloudflare_zone.zone.id
    name = "${fly_cert.apexCert.dnsvalidationhostname}"
    value = "${fly_cert.apexCert.dnsvalidationtarget}"
    type = "CNAME"
}

# status page
resource "cloudflare_record" "status" {
    zone_id = data.cloudflare_zone.zone.id
    name    = "status"
    type    = "CNAME"
    value   = "page.updown.io"
    proxied = false
}

resource "cloudflare_record" "statusVerification" {
    zone_id = data.cloudflare_zone.zone.id
    name = "_updown.status"
    value = "\"updown-page=p/jn8zj\""
    type = "TXT"
}