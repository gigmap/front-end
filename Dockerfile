FROM node:latest as build
ARG YANDEX_API_KEY
ARG GIGMAP_API_URL
ARG SUPPORT_EMAIL
ENV REACT_APP_YANDEX_API_KEY $YANDEX_API_KEY
ENV REACT_APP_API_BASE_URL $GIGMAP_API_URL
ENV REACT_APP_SUPPORT_EMAIL $SUPPORT_EMAIL
RUN mkdir /app
WORKDIR /app
COPY . .
COPY .env.example .env
RUN npm ci
RUN npm run build

FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html