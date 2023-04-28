FROM golang:1.20.3-alpine as builder

RUN apk update && apk add vips

WORKDIR /app
ADD go.mod /app
ADD go.sum /app
RUN go mod download

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


FROM alpine as runner
RUN apk update && apk add ca-certificates iptables ip6tables bash fuse3 sqlite curl vips && rm -rf /var/cache/apk/*

WORKDIR /app

COPY --from=flyio/litefs:0.4 /usr/local/bin/litefs /app/bin/litefs

ADD static /app/static
ADD migrations /app/migrations

COPY --from=builder /app/simse /app/simse
RUN chmod +x /app/simse

COPY --from=tailwind /app/static/style.css /app/static/style.css

ADD litefs.yml /etc/litefs.yml

ENTRYPOINT ./simse