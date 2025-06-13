# 1단계: 빌드 환경
FROM node:22.13.1-alpine AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# 명시적으로 패키지 락파일 복사
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=https://dev.kakaobase.com/api

# .dockerignore 반드시 설정되어 있어야 함 (node_modules, .git 등)
RUN npm run build

# 2단계: 실행 환경
FROM node:22.13.1-alpine AS runner

ENV NODE_ENV=production
# API_BASE_URL은 build-time보다 runtime에 환경변수로 넘기는 것이 더 유연함
ENV NEXT_PUBLIC_API_BASE_URL=https://dev.kakaobase.com/api
WORKDIR /app

# 빌드산출물만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000
CMD ["npm", "run", "start"]
