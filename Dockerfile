FROM node:14.19.1-alpine3.15 as builder

# Create app directory
WORKDIR /app

# Install app dependencies
COPY "package*.json" "./"
RUN npm clean cache --force && npm ci --only=production && npm clean cache --force

# Remove Development Dependencies
RUN npm prune --production
RUN rm -rf node_modules/rxjs/src/
RUN rm -rf node_modules/rxjs/bundles/
RUN rm -rf node_modules/rxjs/_esm5/
RUN rm -rf node_modules/rxjs/_esm2015/
RUN rm -rf node_modules/swagger-ui-dist/*.map

# Bundle app source
COPY . .

# Build app
RUN npm run build

# Production Stage
FROM node:14.19.1-alpine3.15

# Install system requirements
RUN apk update && apk add dumb-init

# Setup app options
ARG DB_OPTIONS
ENV DB_OPTIONS=$DB_OPTIONS
ENV NODE_ENV=production

USER node

# Create app directory
WORKDIR /usr/src/app

# Copy build files
COPY --chown=node:node --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist /usr/src/app
EXPOSE 3000
CMD ["dumb-init", "node", "server.js"]