FROM node:18.12-buster-slim

WORKDIR /application

COPY package.json yarn.lock ./

RUN yarn config set network-timeout 300000

RUN yarn --production=false --frozen-lockfile --no-progress

CMD ["yarn", "dev"]
