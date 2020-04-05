FROM node:13

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY yarn.lock package.json /usr/src/app/
RUN yarn install --frozen-lockfile

COPY . /usr/src/app

ENV NODE_ENV=production
RUN yarn build

COPY ./dist /usr/src/app

EXPOSE 4700
CMD [ "yarn", "start" ]