FROM node

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src

# add `/usr/src/node_modules/.bin` to $PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# install and cache app dependencies
ADD package.json /usr/src/package.json
ADD gulpfile.js /usr/src/gulpfile.js
RUN npm install

RUN npm run build

# start app
CMD ["npm", "start"]
