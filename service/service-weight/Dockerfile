FROM golang:1.18.4

LABEL org.opencontainers.image.source https://github.com/simse/simse.io

WORKDIR /app
COPY . /app

RUN go build
RUN chmod +x service-weight

ENTRYPOINT [ "./service-weight" ]