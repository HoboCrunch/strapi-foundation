# Production Dockerfile for Strapi on Railway
FROM node:20-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build admin panel
ENV NODE_ENV=production
RUN npm run build

# Production stage
FROM node:20-slim as production

WORKDIR /app

# Install runtime dependencies for sharp
RUN apt-get update && apt-get install -y \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/config ./config
COPY --from=builder /app/src ./src
COPY --from=builder /app/package*.json ./

# Set environment
ENV NODE_ENV=production
ENV HOST=0.0.0.0

EXPOSE 1337

CMD ["npm", "run", "start"]
