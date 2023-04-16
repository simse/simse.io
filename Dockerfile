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

FROM alpine as runner

WORKDIR /app

RUN apk add bash fuse sqlite ca-certificates curl
COPY --from=flyio/litefs:0.3 /usr/local/bin/litefs /usr/local/bin/litefs

COPY --from=builder /app/simse /app/simse
RUN chmod +x /app/simse

COPY --from=tailwind /app/static/style.css /app/static/style.css

ADD litefs.yml /etc/litefs.yml

ENTRYPOINT litefs mount -- ./simse