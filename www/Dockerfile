FROM --platform=amd64 node:16.13.1 AS BUILD

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/
RUN yarn --frozen-lockfile

COPY . /app/
RUN yarn build

RUN rm -rf node_modules
RUN yarn install --production
RUN yarn cache clean

FROM --platform=amd64 node:16.13.1

WORKDIR /app

COPY --from=BUILD /app/public /app/
COPY --from=BUILD /app/package.json /app/
COPY --from=BUILD /app/node_modules /app/

ENTRYPOINT [ "yarn", "serve" ]