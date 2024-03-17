# Use an official Node.js runtime as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the project files to the working directory
COPY . .

# Build the frontend application
RUN yarn build

# Expose port 3000 for HTTP traffic
EXPOSE 3000

# Define the command to start the application
CMD ["yarn", "start"]
