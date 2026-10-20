# Development image: Node plus the project's dependencies. The source is mounted at run time
# (see docker-compose.yml), so edits on the host show up in the dev server without a rebuild.
# The full (non-slim) image already has git and ssh, which the VS Code dev container uses.
# Keep NODE_VERSION in step with .node-version (which Cloudflare Pages uses).
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-bookworm

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
