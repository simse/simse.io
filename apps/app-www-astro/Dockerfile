FROM node:18-alpine

RUN npm install -g pnpm

WORKDIR /app
COPY . /app/
RUN pnpm i
RUN pnpm build

