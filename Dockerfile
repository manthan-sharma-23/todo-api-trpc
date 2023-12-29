FROM node:21.5.0-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}
EXPOSE 3200

CMD [ "npm","run","dev" ]

