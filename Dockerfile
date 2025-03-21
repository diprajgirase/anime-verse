# Base image
FROM node:18-alpine AS build
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and node_modules
COPY package.json package-lock.json* ./ 
RUN npm ci --force        

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

# Copy necessary files from local machine (built files)
COPY ./.next ./.next
COPY ./public ./public
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm i --force

# Set environment variables for production
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
