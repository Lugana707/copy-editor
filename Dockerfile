# syntax=docker/dockerfile:experimental

FROM node:12 AS base

WORKDIR /src

FROM base AS test

ENV NODE_ENV=development

COPY . .
RUN \
  --mount=id=node_modules,type=cache,target=/src/node_modules \
  --mount=type=tmpfs,target=/src/build \
  npm ci

FROM test AS build

ENV NODE_ENV=production

RUN \
  --mount=id=node_modules,type=cache,target=/src/node_modules \
  npm run build

FROM scratch AS release

COPY --from=build /src/build /build

FROM release AS deploy
