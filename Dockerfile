# syntax=docker/dockerfile:experimental

FROM node:14.17.6-alpine3.14 AS base

RUN npm install -g npm@7.23.0
WORKDIR /src

FROM base AS dependencies

COPY package.json package-lock.json .
RUN npm ci

FROM base AS test

ENV NODE_ENV=development

COPY . .
RUN \
  --mount=type=cache,target=/src/node_modules,from=dependencies,source=/src/node_modules \
  --mount=type=tmpfs,target=/src/dist \
  npm run test

FROM test AS build

ENV NODE_ENV=production

COPY . .
RUN \
  --mount=type=cache,target=/src/node_modules,from=dependencies,source=/src/node_modules \
  npm run build

FROM scratch AS release

COPY --from=test /src/junit.xml /test/results/junit.xml
COPY --from=test /src/coverage /test/coverage
COPY --from=build /src/dist /build

FROM release AS deploy
