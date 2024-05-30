FROM node:alpine

MAINTAINER independizate

WORKDIR /src/app

COPY . /src/app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]

EXPOSE 4200