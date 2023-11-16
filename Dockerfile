FROM node:18.18.2 AS build

WORKDIR /tonality/tonality-client

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.24.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /tonality/tonality-client/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]