FROM --platform=$BUILDPLATFORM docker.io/oven/bun:1.2.5 AS build

WORKDIR /app
COPY package.json bun.lock .

RUN bun install --frozen-lockfile

COPY . .

RUN bun --bun run astro build

FROM docker.io/oven/bun:1.2.5 AS start

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

WORKDIR /app

COPY package.json bun.lock .
RUN bun install --production

COPY --from=build /app/dist ./dist
COPY --from=build /app/public ./public


ENTRYPOINT [ "bun", "/app/dist/server/entry.mjs" ]
