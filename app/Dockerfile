FROM node:18-alpine3.17

WORKDIR /app

ENV INDOCKER=true
ENV PORT=3000
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]