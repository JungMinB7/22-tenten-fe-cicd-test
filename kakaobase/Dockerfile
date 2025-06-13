# 1단계: 빌드 환경
FROM node:22.13.1-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

# 2단계: 실행 환경
FROM node:22.13.1-alpine AS runner

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_BASE_URL=https://dev.kakaobase.com/api/

WORKDIR /app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000
CMD ["npm", "run", "start"]