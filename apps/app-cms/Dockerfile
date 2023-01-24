FROM node:16.13.1-slim AS build

RUN npm -g install pnpm

WORKDIR /simse
COPY . /simse/

RUN pnpm i --filter app-cms --frozen-lockfile

FROM build

WORKDIR /simse
COPY --from=build /simse /simse/

WORKDIR /simse/apps/app-cms

RUN pnpm build

WORKDIR /simse
RUN pnpm install --filter app-cms --prod --frozen-lockfile

WORKDIR /simse/apps/app-cms

ENTRYPOINT [ "pnpm", "serve" ]