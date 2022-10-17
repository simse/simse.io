package main

import (
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		/*conf := config.New(ctx, "")

		// create @ A record
		_, err := cloudflare.NewRecord(ctx, "root", &cloudflare.RecordArgs{
			Name:    pulumi.String("@"),
			ZoneId:  pulumi.String(conf.Require("zoneId")),
			Type:    pulumi.String("CNAME"),
			Value:   pulumi.String("simse-io-dev.pages.dev"),
			Ttl:     pulumi.Int(1),
			Proxied: pulumi.BoolPtr(true),
		})

		if err != nil {
			return err
		}*/

		return nil
	})
}
