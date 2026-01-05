# 构建阶段
FROM node:22-alpine AS builder

WORKDIR /web

# 先复制依赖文件（利用缓存）
COPY  package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# 再复制源码文件
COPY . .

# Prisma 生成客户端（服务器性能有限，目前还是在本地构建项目了再上传服务器）
# RUN pnpm run generate

# 构建生产环境代码（服务器性能有限，目前还是在本地构建项目了再上传服务器）
# RUN pnpm run build

# 运行阶段
FROM node:22-alpine AS runner

WORKDIR /web

ENV NODE_ENV=production

# 复制构建阶段的产物
COPY --from=builder /web/package.json ./
COPY --from=builder /web/.next ./.next
COPY --from=builder /web/public ./public
COPY --from=builder /web/node_modules ./node_modules
COPY --from=builder /web/prisma ./prisma


EXPOSE 3000

CMD [ "node", "node_modules/next/dist/bin/next", "start"]

