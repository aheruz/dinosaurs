# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy the HTML, CSS, and JS files into the container
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80
