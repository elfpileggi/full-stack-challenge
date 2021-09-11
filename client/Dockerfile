FROM node:16-alpine

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python3

RUN mkdir -p /app
ADD package.json yarn.lock /app/
WORKDIR /app
RUN npx yarn install

COPY ./src ./src
COPY ./public ./public

CMD [ "npm", "start" ]
