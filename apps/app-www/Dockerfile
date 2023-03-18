FROM node:18.13.0-alpine AS build

RUN npm -g install pnpm

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter app-www --frozen-lockfile

WORKDIR /simse/apps/app-www

RUN pnpm build

WORKDIR /simse
RUN rm -rf node_modules

FROM node:18.13.0-alpine AS runtime

RUN npm -g install pnpm

RUN apk add --no-cache curl
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN apk del curl

WORKDIR /simse
COPY --from=build /simse .

RUN pnpm i --filter app-www --frozen-lockfile
RUN node-prune

WORKDIR /simse/apps/app-www

ENTRYPOINT [ "pnpm", "serve" ]