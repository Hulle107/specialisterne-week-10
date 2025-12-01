FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npx prisma generate
RUN npm run next:build

FROM node:20-alpine AS runner

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app ./

# Expose ports
EXPOSE 3000

# Start the server
CMD ["npm", "run", "next:start"]