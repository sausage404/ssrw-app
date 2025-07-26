FROM node:22-alpine AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-fund --no-update-notifier

FROM node:22-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS deploy
WORKDIR /app
ENV NODE_ENV="production"
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/prisma/schema.prisma ./prisma/schema.prisma

EXPOSE 3000
CMD ["node", "server.js"]