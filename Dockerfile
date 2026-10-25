FROM docker.io/library/node:24.22.1-bookworm-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205

WORKDIR /app
RUN apt-get update \
  && apt-get install -y --no-install-recommends tini curl \
  && rm -rf /var/lib/apt/lists/* \
  && npm install --global pnpm@11.24.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
ARG EMDASH_SITE_URL=https://beerjs.mk
ENV EMDASH_SITE_URL=$EMDASH_SITE_URL
RUN pnpm build

ENV NODE_ENV=production HOST=0.0.0.0 PORT=80
EXPOSE 80
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["sh", "-c", "mkdir -p data/uploads && exec node ./dist/server/entry.mjs"]
