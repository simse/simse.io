FROM node:18.13.0-alpine as BUILD

RUN npm -g install pnpm

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter service-chat --frozen-lockfile

WORKDIR /simse/services/service-chat

RUN pnpm prisma generate
RUN pnpm run build

FROM alpine

RUN apk add --update nodejs npm

RUN npm -g install pnpm

WORKDIR /simse

WORKDIR /simse/services/service-chat


COPY --from=BUILD /simse/services/service-chat/package.json ./package.json
COPY --from=BUILD /simse/services/service-chat/dist ./dist
COPY --from=BUILD /simse/services/service-chat/prisma/ ./prisma
COPY --from=BUILD /simse/services/service-chat/node_modules/prisma/libquery_engine-linux-musl-openssl-3.0.x.so.node ./dist/libquery_engine-linux-musl-openssl-3.0.x.so.node

ENTRYPOINT ["pnpm", "start"]