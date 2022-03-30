FROM node:12-alpine as frontend-builder

WORKDIR /home/app

COPY ./package.json ./package-lock.json ./webpack.config.prod.js .babelrc ./
COPY ./src ./src
RUN npm ci && npm run build

FROM node:12-alpine as express-server 
WORKDIR /home/app

COPY package.json package-lock.json ./
RUN npm ci --production 

FROM node:12-alpine 
ENV NODE_ENV=production
EXPOSE 8080
WORKDIR /home/app

COPY --from=frontend-builder /home/app/dist ./dist
COPY --from=express-server /home/app/node_modules ./node_modules
COPY production_server.js config.js ./

EXPOSE 8080

CMD ["node", "production_server.js"]
