FROM node:16.13.1-slim AS build

ENV PAYLOAD_PUBLIC_CLOUDFLARE_IMAGES_ACCOUNT_HASH=momKfEj2XLFFfTO94YnvIg

RUN npm -g install pnpm

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter app-cms --frozen-lockfile

WORKDIR /simse/apps/app-cms

RUN pnpm build


ENTRYPOINT [ "pnpm", "serve" ]