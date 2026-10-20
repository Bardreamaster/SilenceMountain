# Development image: Node plus the project's dependencies. The source is mounted at run time
# (see docker-compose.yml), so edits on the host show up in the dev server without a rebuild.
# The full (non-slim) image already has git and ssh, which the VS Code dev container uses.
# Keep NODE_VERSION in step with .node-version (which Cloudflare Pages uses).
ARG NODE_VERSION=22
FROM node:${NODE_VERSION}-bookworm

# Git LFS, so large files tracked with LFS work inside the container. --system puts the LFS
# filters in /etc/gitconfig, so they apply to every user and survive a mounted ~/.gitconfig.
RUN apt-get update \
 && apt-get install -y --no-install-recommends git-lfs \
 && rm -rf /var/lib/apt/lists/* \
 && git lfs install --system

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
