ARG ENV

FROM node:12.19.0-alpine3.9

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json yarn.lock ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# ## THE LIFE SAVER
# ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait  /wait
# RUN chmod +x /wait

CMD [ "npm", "run","start:dev" ]