FROM node:18.13.0-alpine

RUN npm -g install pnpm

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter service-chat --frozen-lockfile

WORKDIR /simse/services/service-chat

ENTRYPOINT ["pnpm", "start"]