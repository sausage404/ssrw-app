# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# กำหนด ARG สำหรับ DATABASE_URL และส่งเข้า ENV
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# สำคัญ: ต้อง copy .env เข้ามาให้ prisma ใช้ได้
COPY .env .env

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

CMD npx prisma migrate deploy && npm start