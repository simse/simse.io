FROM golang:1.20.3-alpine as builder

WORKDIR /app
COPY . /app

RUN go build -o simse

FROM ubuntu:20.04 as tailwind

WORKDIR /app

RUN apt-get update
RUN apt-get install -y curl

RUN curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
RUN chmod +x tailwindcss-linux-x64
COPY . /app
RUN echo '@tailwind base;@tailwind components;@tailwind utilities;' > input.css
RUN ./tailwindcss-linux-x64 build input.css -o static/style.css --minify

FROM alpine:latest as tailscale
WORKDIR /app
ENV TSFILE=tailscale_1.38.4_amd64.tgz
RUN wget https://pkgs.tailscale.com/stable/${TSFILE} && \
  tar xzf ${TSFILE} --strip-components=1

FROM alpine as runner
RUN apk update && apk add ca-certificates iptables ip6tables bash fuse3 sqlite curl && rm -rf /var/cache/apk/*

WORKDIR /app

COPY --from=flyio/litefs:0.4 /usr/local/bin/litefs /usr/local/bin/litefs
COPY --from=tailscale /app/tailscaled /app/tailscaled
COPY --from=tailscale /app/tailscale /app/tailscale
RUN mkdir -p /var/run/tailscale /var/cache/tailscale /var/lib/tailscale

ADD static /app/static
ADD start.sh /app/start.sh

COPY --from=builder /app/simse /app/simse
RUN chmod +x /app/simse
RUN chmod +x /app/start.sh

COPY --from=tailwind /app/static/style.css /app/static/style.css

ADD litefs.yml /etc/litefs.yml

ENTRYPOINT litefs mount -- ./start.sh