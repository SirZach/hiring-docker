FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist
RUN mkdir -p /usr/src/app/data

# Install app dependencies
COPY package.json /usr/src/app/
COPY dist /usr/src/app/dist/
COPY data /usr/src/app/data/
COPY app.js /usr/src/app/

WORKDIR /usr/src/app

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "start" ]
