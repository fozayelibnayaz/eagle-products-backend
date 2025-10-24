# Use official Node.js runtime
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies first (for better caching)
COPY package*.json ./

RUN npm ci --only=production

# Copy source code
COPY src/ src/
COPY tsconfig.json .

# Build TypeScript
RUN npx tsc

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/routes/index.js"]
