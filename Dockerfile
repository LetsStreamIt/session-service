# Use Node 20.16 alpine as base image
FROM node:20.17-alpine3.19 AS base

# Change the working directory to /build
WORKDIR /build

# Copy the package.json and package-lock.json files to the /build directory
COPY . .

RUN npm install

# Install production dependencies and clean the cache
RUN npm ci && npm cache clean --force

# Copy the entire source code into the container
COPY . .

# Document the port that may need to be published
EXPOSE 5000

# Start the application
CMD ["node", "src/server.js"]
