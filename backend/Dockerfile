FROM node:18-alpine AS builder

WORKDIR /illustry

COPY package.json .
COPY package-lock.json .
RUN npm i

COPY tsconfig.json .
COPY webpack.config.js .
COPY src ./src

RUN npm run build:ts
RUN npm run webpack

FROM node:18-alpine

WORKDIR /illustry

ENV NODE_ENV=production

COPY --from=builder /illustry/build-dist /illustry/

RUN rm -rf /usr/illustry/src

RUN npm install xlsx-stream-reader@1.1.1

ENV ILLUSTRY_PORT=7001

EXPOSE $ILLUSTRY_PORT

LABEL name="Illustry"
LABEL description="A hub for visualizing data about software systems"

RUN chmod -R 777 /illustry

CMD ["node", "illustry.js"]
