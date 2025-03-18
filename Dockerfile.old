FROM node:18-bullseye as builder

WORKDIR /var/www/

COPY package*.json ./

RUN npm install

COPY . .

COPY ./scripts /usr/local/bin/

RUN chmod +x -R /usr/local/bin

EXPOSE 80

ENTRYPOINT ["start.sh", "$NODE_ENV"]
