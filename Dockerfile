# ---------- 构建阶段 ----------
FROM node:22-alpine AS builder

WORKDIR /app

# 启用 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 拷贝源码
COPY . .

# 安装依赖
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# 生成 prisma
RUN pnpm run generate

# 构建
RUN pnpm run build


# ---------- 运行阶段 ----------
FROM node:22-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# 只拷贝运行需要的文件
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/package.json ./

# 只装生产依赖
RUN pnpm install --prod

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
