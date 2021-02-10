FROM node:14.15.4

WORKDIR /mike/src/app

COPY package*.json ./


RUN npm install

COPY .  .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/main"]

