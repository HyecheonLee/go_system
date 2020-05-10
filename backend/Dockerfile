# Dockerfile
FROM golang:1.13.10-alpine3.11

WORKDIR /app
COPY . .
RUN apk update && apk add git && apk add --update nodejs nodejs-npm && npm install pm2 -g --save && go get github.com/cespare/reflex


EXPOSE 1200
CMD ["reflex", "-c", "reflex.conf"]