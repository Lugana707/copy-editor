# syntax=docker/dockerfile:experimental

FROM node:12 AS base

WORKDIR /src

FROM base AS dependencies

COPY package.json package-lock.json .
RUN npm ci

FROM base AS test

ENV NODE_ENV=development

COPY . .
RUN \
  --mount=type=cache,target=/src/node_modules,from=dependencies,source=/src/node_modules \
  npm run test

FROM test AS build

ENV NODE_ENV=production

COPY . .
RUN \
  --mount=type=cache,target=/src/node_modules,from=dependencies,source=/src/node_modules \
  npm run build

FROM scratch AS release

COPY --from=test /src/coverage /test/coverage
COPY --from=build /src/build /build

FROM release AS deploy
