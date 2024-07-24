# Use an official Node.js Alpine image as the base
FROM node:14.17.3-alpine

# Install xdg-utils using apk package manager
RUN apk update \
    && apk add --no-cache xdg-utils

# Set the working directory in the container
WORKDIR /app

# Copy your application files
COPY . .

# Install npm dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3005

# Command to run your application
CMD ["npm", "start"]
