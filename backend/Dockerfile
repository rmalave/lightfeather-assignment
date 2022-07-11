# pull official base image
FROM node:14.16.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/backend/node_modules/.bin:$PATH

# install app dependencies
COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install

# add app
COPY . ./

EXPOSE 3001

# start app
CMD ["node", "index.js"]   