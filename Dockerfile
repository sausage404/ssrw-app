# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# รับค่าจาก docker-compose
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# คัดลอกเฉพาะไฟล์ dependency ก่อน เพื่อให้ Docker cache ได้
COPY package.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code และ .env
COPY . .

# Generate Prisma Client หลังจากมี dependencies แล้ว
RUN npx prisma generate

# Build แอป
RUN npm run build

# Runtime stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./

# ติดตั้งเฉพาะ production dependencies
RUN npm install --omit=dev

# คัดลอกไฟล์ที่จำเป็นจาก builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/.env ./.env

# ย้ำ ENV อีกรอบ
ENV DATABASE_URL=$DATABASE_URL

# รัน prisma migrate แล้วเริ่มแอป
CMD npm start
