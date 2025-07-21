# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# รับค่าจาก docker-compose
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json ./
RUN npm ci

# คัดลอก source code และ .env
COPY . .

# สำคัญ: ให้ Prisma เห็น DATABASE_URL ตอน generate และ build
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

# เอา .env ที่ผ่านมาจาก build stage (ถ้ามี)
COPY --from=builder /app/.env ./.env

# ตั้ง ENV อีกครั้งเพื่อความชัวร์
ENV DATABASE_URL=$DATABASE_URL

CMD npx prisma migrate deploy && npm start
