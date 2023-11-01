# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy all your project files to the working directory
COPY . .

# Expose a port (if your app listens on a specific port)
EXPOSE 5000

# Command to start your Node.js application
CMD ["npm", "start"]
