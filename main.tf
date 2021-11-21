provider "aws" {
  region = var.aws_region
}

provider "cloudflare" {}

data "cloudflare_zones" "domain" {
  filter {
    name = var.site_domain
  }
}

// Set cloudflare settings
resource "cloudflare_zone_settings_override" "simse" {
  zone_id = data.cloudflare_zones.domain.zones[0].id

  settings {
    brotli = "on"
    opportunistic_encryption = "on"
    //automatic_https_rewrites = "on"
    always_use_https = "on"
    always_online    = "off"
    ssl = "flexible"
    minify {
      css  = "off"
      js   = "off"
      html = "off"
    }
    security_header {
      enabled = true
    }
  }
}

// Set up cloudflare page rules
resource "cloudflare_page_rule" "redirect_www" {
  zone_id  = data.cloudflare_zones.domain.zones[0].id
  target   = "www.${var.site_domain}"
  priority = 1

  actions {
    forwarding_url {
        url = "https://${var.site_domain}"
        status_code = 301
    }
  }
}

/* resource "cloudflare_page_rule" "aggresive_cache" {
  zone_id  = data.cloudflare_zones.domain.zones[0].id
  target   = "*"
  priority = 2

  actions {
    cache_level = "cache_everything"
  }
} */

// Set up static DNS records
resource "cloudflare_record" "gatsby_cloud_1" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "@"
  value   = "199.232.194.78"
  type    = "A"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "gatsby_cloud_2" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "@"
  value   = "199.232.198.78"
  type    = "A"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "gatsby_cloud_3" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "www"
  value   = "simse.gatsbyjs.io"
  type    = "CNAME"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "ghost_address" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "ghost"
  value   = "116.202.234.197"
  type    = "A"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "wp_address" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "editor"
  value   = "116.202.234.197"
  type    = "A"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "simse_telemetry" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "telemetry"
  value   = "78.46.46.239"
  type    = "A"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "google_ownership" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "simse.io"
  value   = "google-site-verification=a4GWEe3RrWowXPam8oJq51UFVx_-RcJRcf0q8xDaSyg"
  type    = "TXT"
  ttl     = 3600
}

// health.simse.io
resource "cloudflare_record" "simse_health_api" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "api.health"
  value   = "116.202.234.197"
  type    = "A"

  ttl     = 3600
  proxied = false
}

resource "cloudflare_record" "simse_health" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "health"
  value   = "simsehealth.gatsbyjs.io"
  type    = "CNAME"

  ttl     = 3600
  proxied = false
}

// Set up main domain
/* module "main_site" {
  source      = "./bucket"
  name        = var.site_domain
  site_domain = var.site_domain
} */

// Set up labs sites
module "lab_site" {
  source      = "./bucket"
  name        = "labs.${var.site_domain}"
  site_domain = var.site_domain
}
