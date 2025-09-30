FROM node:20-alpine

WORKDIR /api

COPY package*.json tsconfig.json tsconfig.build.json nodemon.json ./

RUN npm install

COPY . .

RUN npm run build  # Pre-compile TypeScript during build

EXPOSE 3000

CMD ["npm", "run", "start"]
