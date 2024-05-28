FROM node:22 AS build
WORKDIR /app
COPY . .
RUN npm install --force && npm run build
RUN npm run lint 
ENTRYPOINT [ "node", "./dist/main.js" ]
