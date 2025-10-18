# Build
FROM node:22-alpine AS build
ARG PROJECT_NAME
ARG CONFIG=production

WORKDIR /workspace

# Install pnpn
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .

# Build specified project
RUN pnpm nx build "$PROJECT_NAME" --configuration="$CONFIG"

# Runtime
FROM nginx:1.27-alpine
ARG PROJECT_NAME
# Minimal SPA fallback config (optional but recommended)
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /workspace/dist/apps/${PROJECT_NAME}/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
