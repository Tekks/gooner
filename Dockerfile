From node:25.2-alpine

COPY . /usr/app
WORKDIR /usr/app

RUN npm install

CMD ["npm", "run", "start:prod"]