# --- Build Stage ---
FROM node:20-alpine AS build

# Set working directory inside container
WORKDIR /api

# Copy package files first (for caching)
COPY package*.json tsconfig*.json ./

# Install all dependencies (including dev for TypeScript)
RUN npm ci

# Copy source and DB scripts
COPY src ./src
COPY db ./db

# Compile TypeScript
RUN npm run build

# --- Runtime Stage ---
FROM node:20-alpine AS runtime

WORKDIR /api

# Copy only what we need to run the app
COPY --from=build /api/package*.json ./
COPY --from=build /api/dist ./dist
COPY --from=build /api/db ./db

# Install only production dependencies
RUN npm ci --production

# Azure expects the container to listen on PORT
ENV PORT=80
EXPOSE 80

# Start the server
CMD ["node", "dist/server.js"]
