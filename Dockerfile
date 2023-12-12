FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_PUBLIC_EXCHANGE_HOST
ENV REACT_APP_PUBLIC_EXCHANGE_HOST $REACT_APP_PUBLIC_EXCHANGE_HOST
RUN npm run build --production
RUN npm install -g serve
EXPOSE 3005
CMD serve -p 3005 -s build
