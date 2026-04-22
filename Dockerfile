FROM node:22-alpine

WORKDIR /app

# 拷贝必要文件
COPY package.json pnpm-lock.yaml ./
COPY .next ./.next
COPY public ./public
COPY prisma ./prisma
COPY src/generated ./src/generated
COPY next.config.ts ./

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 只安装生产依赖
RUN pnpm install --prod

ENV NODE_ENV=production
EXPOSE 3000

CMD ["pnpm", "start"]
