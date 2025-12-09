# # ---------------------------
# # 1️⃣ Build Stage
# # ---------------------------
# FROM node:22-alpine AS builder

# # Install pnpm globally
# RUN npm install -g pnpm

# WORKDIR /app

# # Copy dependency files first for caching
# COPY package.json pnpm-lock.yaml ./

# # Install all dependencies (dev + prod)
# RUN pnpm install

# # Copy the rest of the app
# COPY . .

# # Set build-time environment variable (NEXT_PUBLIC_* for frontend)
# ARG NEXT_PUBLIC_API_BASE_URL=https://e-bazaar-backend.vercel.app/
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_BASE_URL}

# # Build Next.js app
# RUN pnpm build

# ---------------------------
# 2️⃣ Runtime Stage
# ---------------------------
FROM node:22-alpine AS runner

# Install pnpm for runtime if needed
RUN npm install -g pnpm

WORKDIR /app

# Copy only production dependencies
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

# Set build-time environment variable (NEXT_PUBLIC_* for frontend)
ARG NEXT_PUBLIC_API_BASE_URL=https://e-bazaar-backend.vercel.app/
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_BASE_URL}

# Build Next.js app
RUN pnpm build

# Expose port
EXPOSE 3000

# Start Next.js
CMD ["pnpm", "start"]
