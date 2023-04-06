FROM node:19.8.1-alpine AS build

ARG env

ENV PUBLIC_ENV=$env

RUN npm -g install pnpm@7.31.0

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter app-www --frozen-lockfile

WORKDIR /simse/apps/app-www

RUN pnpm build

WORKDIR /simse
RUN rm -rf node_modules

FROM node:19.8.1-alpine AS runtime

RUN npm -g install pnpm@7.31.0

RUN apk add --no-cache curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN apk del curl

WORKDIR /simse
COPY --from=build /simse .

RUN pnpm i --filter app-www --frozen-lockfile
RUN node-prune

WORKDIR /simse/apps/app-www

ENTRYPOINT [ "pnpm", "serve" ]