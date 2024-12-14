FROM node:22-alpine

ENV PEPY_API_KEY="placeholder_token"
ENV SANITY_PROJECT_ID="rjqusm5i"
ENV SANITY_PROJECT_DATASET="production"

RUN npm install -g pnpm

WORKDIR /app
COPY . /app

RUN pnpm install --frozen-lockfile
RUN pnpm build

ENTRYPOINT [ "pnpm", "start" ]