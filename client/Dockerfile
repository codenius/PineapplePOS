### Build Step
# pull the Node.js Docker image
FROM node:16-alpine AS build
# change working directory
WORKDIR /app
# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

RUN npm ci
# Copy project files
COPY . .

RUN npm run build

FROM nginx:1.23-alpine AS prod

COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80