FROM node:20-alpine

WORKDIR /next

# Copy
COPY next/package*.json ./
COPY next .

# Installer dependencies via npm
RUN npm install
RUN npx prisma generate
RUN npm run next:build

# Expose port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "next:start"]