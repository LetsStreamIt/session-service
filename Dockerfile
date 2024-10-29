# build stage
FROM node:lts AS build-stage

WORKDIR /app
# Install dependencies
COPY package*.json ./
RUN npm install
# Build
COPY . .
RUN npm run build

# Run app using pm2
RUN npm install pm2 -g 
CMD ["pm2-runtime", "dist/app.js"]