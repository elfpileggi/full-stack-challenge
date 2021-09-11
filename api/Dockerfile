FROM node:16-slim

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV

ARG PORT=5000
ENV PORT $PORT
EXPOSE $PORT

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

RUN mkdir -p /app/src 
COPY ./src /app/src

USER node

CMD ["npm", "start"]
