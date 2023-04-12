FROM node:19.8.1-alpine as builder

RUN npm install -g pnpm@8.2.0

WORKDIR /app
COPY . /app

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM alpine

RUN apk add bash fuse sqlite ca-certificates curl
COPY --from=flyio/litefs:0.3 /usr/local/bin/litefs /usr/local/bin/litefs

RUN apk add --no-cache nodejs

WORKDIR /app
COPY --from=builder /app/build /app
COPY --from=builder /app/package.json /app
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node ./libquery_engine-linux-musl-openssl-3.0.x.so.node

ADD litefs.yml /etc/litefs.yml
ADD start.sh /app/start.sh

ENTRYPOINT litefs mount -- sh start.sh