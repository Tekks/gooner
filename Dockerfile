From node:20.3.1-alpine

COPY . /usr/app
WORKDIR /usr/app

RUN npm install

CMD ["npm", "run", "start:prod"]