# --- Base image ---
FROM node:20-alpine AS build

# Set working directory inside the container
WORKDIR /api

# Copy only package and config files first (for caching)
COPY package*.json tsconfig*.json ./

# Install only production dependencies (if you use devDeps for build, keep `npm ci`)
RUN npm ci

# Copy source code and any database scripts
COPY src ./src
COPY db ./db

# Build the TypeScript code
RUN npm run build

# --- Runtime image ---
FROM node:20-alpine AS runtime

WORKDIR /api

# Copy only what is needed to run the built app
COPY --from=build /api/package*.json ./
COPY --from=build /api/dist ./dist
COPY --from=build /api/db ./db

# Install only production dependencies
RUN npm ci 

# Azure App Service expects the container to listen on port 80
EXPOSE 80

# Default command
CMD ["node", "dist/server.js"]
