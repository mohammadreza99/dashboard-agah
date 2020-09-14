# STAGE 1
FROM node:12.18-alpine AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build:ssr

# STAGE 2
FROM nginx:1.19.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/agah-portal-admin/browser/ /usr/share/nginx/html
