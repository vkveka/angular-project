FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm i
COPY . .

ENV CHOKIDAR_USEPOLLING=true

EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll=2000"]