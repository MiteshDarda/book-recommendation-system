# Dockerfile for NestJS Backend
FROM node:20.10.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]
# CMD ["npm", "run", "start:prod"]
