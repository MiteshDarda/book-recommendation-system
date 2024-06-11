FROM node:20.10.0-alpine

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose the port you want to use
EXPOSE 3000

# Use serve to serve the build directory on the specified port
CMD [ "npm", "run", "preview" ]
