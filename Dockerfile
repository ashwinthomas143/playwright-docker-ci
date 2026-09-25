# The official Playwright image already contains Node, the browsers and
# their system dependencies. Its tag MUST match the @playwright/test
# version in package.json, otherwise Playwright looks for browsers the
# image does not have.
FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

# Copy manifests first so the dependency layer is cached until they change.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV CI=true
CMD ["npx", "playwright", "test"]
