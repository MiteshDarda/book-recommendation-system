# Dockerfile for ReactJS Frontend
FROM node:21

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npx", "serve", "build"]
