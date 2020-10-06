FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG API_URL
ENV VUE_APP_BASE_API $API_URL

RUN npm run build
EXPOSE 8080
CMD [ "npm", "run", "serve" ]
