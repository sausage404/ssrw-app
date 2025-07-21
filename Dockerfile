# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci  # ตรงนี้สำคัญ ต้องมีเพื่อให้ใช้ npx ได้

COPY . .

# ใช้ npx ได้ เพราะมี node_modules แล้ว
RUN npx prisma generate
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env

# รัน migrate deploy ได้ เพราะมี prisma CLI แล้ว
CMD npx prisma migrate deploy && npm start
