FROM node:23-slim AS base
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

FROM base AS development
ENV NODE_ENV=development
# RUN npm install && mv node_modules ../
RUN npm install

COPY . .
EXPOSE 8000

# An alternative to moving node_modules/ is to use an anonymous volume to override the bind mount with a more specific path.
# When using this approach, running containers with --rm will also remove the volume.
# Otherwise, clean up orphaned volumes with `docker rm -v [container name]` or `docker volume prune`
VOLUME ["/usr/src/app/node_modules"]
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
RUN npm install --production --silent
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
