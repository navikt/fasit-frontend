FROM node:22-alpine AS frontend-builder

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /home/app

COPY ./package.json ./pnpm-lock.yaml ./.npmrc ./webpack.config.prod.js .babelrc ./
COPY ./src ./src
RUN pnpm install --frozen-lockfile && pnpm run build

FROM node:22-alpine AS express-server 
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /home/app

COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile --prod

FROM node:22-alpine 
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY --from=frontend-builder /home/app/dist ./dist
COPY --from=express-server /home/app/node_modules ./node_modules
COPY production_server.js config.js ./

CMD ["node", "production_server.js"]
