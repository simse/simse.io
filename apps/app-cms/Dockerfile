FROM node:16.13.1-slim AS build

RUN npm -g install pnpm

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter app-cms --frozen-lockfile

WORKDIR /simse/apps/app-cms

RUN pnpm build


ENTRYPOINT [ "pnpm", "serve" ]