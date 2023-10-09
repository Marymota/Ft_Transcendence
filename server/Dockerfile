# Use the Debian Buster image as the base image
FROM debian:buster

# Update package lists and install Node.js and npm
RUN apt-get update && apt-get install -y \
	curl \
	xz-utils \
	&& apt-get clean \
	&& rm -rf /var/lib/apt/lists/*

# Download Node.js binary for version 19.x
RUN curl -sLO https://nodejs.org/dist/v19.0.0/node-v19.0.0-linux-x64.tar.xz

# Extract Node.js binary
RUN tar -xJf node-v19.0.0-linux-x64.tar.xz -C /usr/local --strip-components=1

# Cleanup
RUN rm node-v19.0.0-linux-x64.tar.xz

# Set the working directory
WORKDIR /app

# Copy the application code to the working directory
COPY . .

RUN npm install
RUN npm run start:dev

# Expose the port the application will run on
EXPOSE 3000

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
