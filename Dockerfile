ARG PNPM_VERSION=11.25.0

FROM node:24-alpine AS base
RUN apk upgrade --no-cache

FROM base AS frontend-builder
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
ARG PNPM_VERSION

WORKDIR /home/app

COPY ./package.json ./pnpm-lock.yaml ./vite.config.mjs ./index.html ./
COPY ./src ./src
COPY ./public ./public
RUN pnpm install --frozen-lockfile && pnpm run build

FROM base AS express-server
ARG PNPM_VERSION
RUN corepack enable && corepack prepare pnpm@${PNPM_VERSION} --activate
WORKDIR /home/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

FROM base
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY --from=frontend-builder /home/app/dist ./dist
COPY --from=express-server /home/app/node_modules ./node_modules
COPY production_server.js config.js ./

CMD ["node", "production_server.js"]
