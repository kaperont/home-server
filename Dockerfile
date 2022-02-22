FROM node:16-alpine

# Create app directory
RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

# Install dependencies
COPY package.json .
RUN npm install

# Bundle app source
COPY index.js .

# Increase number of file watchers
# RUN echo fs.inotify.max_user_watches=582222 | tee -a /etc/sysctl.conf && sysctl -p

# Exports
EXPOSE 5050
CMD [ "npm", "run", "start.dev" ]