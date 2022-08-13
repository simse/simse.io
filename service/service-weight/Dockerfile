FROM golang:1.18.4

LABEL org.opencontainers.image.source https://github.com/simse/simse.io

WORKDIR /app
COPY . /app

RUN go build
RUN chmod +x service-weight

EXPOSE 8080

ENTRYPOINT [ "./service-weight" ]