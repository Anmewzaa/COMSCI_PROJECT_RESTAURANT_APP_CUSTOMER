FROM node:21-alpine

ARG VITE_API_URL

ENV VITE_API_URL=https://paradise-api.up.railway.app

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm","run","preview" ]