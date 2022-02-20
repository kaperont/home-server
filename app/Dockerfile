FROM node:16-alpine

WORKDIR /usr/src/app/home_server_app

COPY package*.json ./

RUN npm install

EXPOSE 0808

CMD ["npm", "run", "serve"]