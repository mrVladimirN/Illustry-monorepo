# Stage 1: Builder
FROM node:20-alpine3.20 AS builder

RUN apk -U upgrade

# Set working directory
WORKDIR /illustry

# Install Yarn Berry
RUN yarn set version berry

# Copy monorepo-wide dependencies
ADD ./.yarn ./.yarn
ADD ./.yarnrc.yml ./
ADD ./yarn.lock ./

# Copy backend-specific files
ADD backend/package.json ./package.json
ADD backend/tsconfig.json ./tsconfig.json
ADD backend/webpack.config.js ./webpack.config.js
ADD backend/src ./src

# Install only backend dependencies
RUN yarn install

# Build the backend
RUN yarn build:ts && yarn webpack --config webpack.config.js

# Stage 2: Production
FROM node:20-alpine3.20

WORKDIR /illustry

# Set environment variables
ENV NODE_ENV=production
ENV ILLUSTRY_PORT=7001

# Copy only the built backend files
COPY --from=builder /illustry/build-dist /illustry/

# Install necessary global npm tools
RUN npm install -g npm

# Clean up unnecessary files
RUN rm -rf /illustry/src

# Ensure proper permissions
RUN chmod -R 777 /illustry

# Expose the application port
EXPOSE $ILLUSTRY_PORT

# Metadata labels
LABEL name="Illustry"
LABEL description="A hub for visualizing data about software systems"

# Start the backend
CMD ["node", "illustry.js"]
