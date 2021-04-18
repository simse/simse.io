variable "name" {}
variable "site_domain" {}

data "cloudflare_zones" "domain" {
  filter {
    name = var.site_domain
  }
}

resource "aws_s3_bucket" "site" {
  bucket = var.name
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}


resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource = [
          aws_s3_bucket.site.arn,
          "${aws_s3_bucket.site.arn}/*",
        ]
      },
    ]
  })
}

resource "cloudflare_record" "site_cname" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = var.name
  value   = aws_s3_bucket.site.website_endpoint
  type    = "CNAME"

  ttl     = 1
  proxied = true
}

resource "cloudflare_record" "site_www_cname" {
  zone_id = data.cloudflare_zones.domain.zones[0].id
  name    = "www.${var.name}"
  value   = aws_s3_bucket.site.website_endpoint
  type    = "CNAME"

  ttl     = 1
  proxied = true
}