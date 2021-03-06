FROM node:12 as build
ARG YANDEX_API_KEY
ARG GIGMAP_API_URL
ARG SUPPORT_EMAIL
ARG GA_ID
ENV REACT_APP_YANDEX_API_KEY $YANDEX_API_KEY
ENV REACT_APP_API_BASE_URL $GIGMAP_API_URL
ENV REACT_APP_SUPPORT_EMAIL $SUPPORT_EMAIL
ENV REACT_APP_GA_ID $GA_ID
RUN mkdir /app
WORKDIR /app
COPY . .
COPY .env.example .env
RUN yarn install --silent --non-interactive
RUN yarn build

FROM nginx:stable
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html