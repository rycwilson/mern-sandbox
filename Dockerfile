FROM node:23-slim AS base
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

FROM base AS development
RUN npm install && mv node_modules ../
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]

FROM base AS production
RUN npm install --production --silent
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
