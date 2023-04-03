FROM node:18.12-buster-slim

WORKDIR /application

RUN apt-get update \
    && apt-get install -y postgresql\
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

COPY package.json yarn.lock ./

RUN yarn --production=false --frozen-lockfile --no-progress

CMD ["yarn", "dev"]
