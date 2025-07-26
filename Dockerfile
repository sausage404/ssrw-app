FROM node:22-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package.json package-lock.json ./

RUN npm install -g npm@latest

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy Prisma schema and generate Prisma client
RUN npx prisma generate

# Build the Next.js application for production
RUN npm run build

FROM node:22-alpine AS runner

# Set the working directory
WORKDIR /app

# Add a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy the build output from the builder stage
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["node", "server.js"]