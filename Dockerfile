# Use a smaller base image for production
FROM node:18-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies first to leverage Docker cache
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --no-progress --no-fund --silent

# Copy only necessary files (excluding dev files via .dockerignore)
COPY . .

# Optional: Set NODE_ENV
ENV NODE_ENV=production
EXPOSE 8080
# Optional: Use a non-root user for better security
# RUN addgroup --system app && adduser --system --group app
# USER app

# Start your app
CMD ["node", "index.js"]
