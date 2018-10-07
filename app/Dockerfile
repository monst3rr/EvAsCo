FROM node

# Create app directory
WORKDIR /usr/src/app


RUN npm install pm2 -g

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY pm2.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 1337
CMD [ "pm2-runtime", "index.js" ]