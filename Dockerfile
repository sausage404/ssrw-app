# Build stage
FROM node:22-slim AS builder
WORKDIR /app

# ติดตั้ง dependencies ก่อน
COPY package.json ./

RUN npm install

# คัดลอก source code ทีหลัง (ให้ใช้ cache ได้)
COPY . .

# Prisma + Build
RUN npx prisma generate
RUN npm run build

# Runtime stage
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

# คัดลอกไฟล์ทั้งหมด
COPY --from=builder /app ./

# รันแอป
CMD ["npm", "start"]
