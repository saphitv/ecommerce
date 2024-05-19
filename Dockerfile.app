FROM node:20

WORKDIR /app

COPY package.json .
RUN npm i --force

CMD ["npm", "run", "dev"]