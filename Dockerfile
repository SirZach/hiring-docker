FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY dist /usr/src/app/
COPY data /usr/src/app/
COPY app.js /usr/src/app/

RUN npm install --production

EXPOSE 3000

CMD [ "npm", "start" ]
