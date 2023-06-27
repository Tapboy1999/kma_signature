FROM node:18-alpine

WORKDIR /kmandtserver

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

RUN npm install -g @babel/cli @babel/core @babel/preset-env

COPY . .

RUN npm run build-src

CMD [ "npm", "run", "build" ]

