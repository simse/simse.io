FROM node:18 as builder

RUN npm install -g pnpm

WORKDIR /app
COPY . /app

RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM alpine

RUN apk add --no-cache nodejs

WORKDIR /app
COPY --from=builder /app/build /app
COPY --from=builder /app/package.json /app

CMD ["node", "index.js"]