FROM public.ecr.aws/docker/library/node:18-slim AS builder
WORKDIR /usr/app
COPY . /usr/app/
RUN apt update -y && apt install -y make python3 libssl-dev
RUN yarn install \
  && yarn run prisma:generate \
  && yarn run build \
  && rm -rf node_modules \
  && yarn install --immutable \
  && yarn run prisma:generate

FROM public.ecr.aws/docker/library/node:18-slim AS runner
RUN apt update -y && apt install -y make python3 libssl-dev
WORKDIR /app
ENV TZ "Asia/Tokyo"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nodejs
USER nodejs


COPY --from=builder --chown=nodejs:nodejs /usr/app/ ./
EXPOSE 4000
CMD ["node", "dist/src/main.js"]
