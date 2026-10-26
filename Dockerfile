ARG NODE_DEV_IMAGE=europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-dev
ARG NODE_RUNTIME_IMAGE=europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim
ARG PNPM_VERSION=12.15.0

FROM ${NODE_DEV_IMAGE} AS base
ARG PNPM_VERSION
USER root
RUN npm install --global pnpm@${PNPM_VERSION}
USER 65532
WORKDIR /app

FROM base AS frontend-builder
COPY --chown=65532:65532 package.json pnpm-lock.yaml pnpm-workspace.yaml vite.config.mjs index.html ./
COPY --chown=65532:65532 src ./src
COPY --chown=65532:65532 public ./public
RUN pnpm install --frozen-lockfile && pnpm run build

FROM base AS express-server
COPY --chown=65532:65532 package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM ${NODE_RUNTIME_IMAGE}
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /app

COPY --from=frontend-builder /app/dist ./dist
COPY --from=express-server /app/node_modules ./node_modules
COPY production_server.js config.js ./

CMD ["production_server.js"]
