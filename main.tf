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

// Set up static DNS records
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

resource "cloudflare_record" "google_ownership" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "simse.io"
  value   = "google-site-verification=a4GWEe3RrWowXPam8oJq51UFVx_-RcJRcf0q8xDaSyg"
  type    = "TXT"
  ttl     = 3600
}

// Set up main domain
module "main_site" {
  source      = "./bucket"
  name        = var.site_domain
  site_domain = var.site_domain
}

// Set up labs sites
module "lab_site" {
  source      = "./bucket"
  name        = "labs.${var.site_domain}"
  site_domain = var.site_domain
}
