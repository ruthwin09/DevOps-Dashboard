FROM node:25-alpine AS dependencies
WORKDIR /workspace
COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages/shared/package.json packages/shared/package.json
COPY packages/config/package.json packages/config/package.json
RUN npm ci

FROM dependencies AS development
COPY . .
RUN npm run build -w @devops-command-center/shared
EXPOSE 3001
CMD ["npm", "run", "dev", "-w", "@devops-command-center/api"]
