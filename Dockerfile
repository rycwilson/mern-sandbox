FROM node:23-slim AS base
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

FROM base AS development
ENV NODE_ENV=development

# An alternative to moving node_modules/ is to use an anonymous volume to override the bind mount with a more specific path.
# This must be done from the docker run command to ensure that the anonymous volume is specified AFTER the bind mount.
# (Any VOLUMEs specified in this file will be processed before command line volumes. Also note bind mounts can only be specified in the docker run command.)
# When using this approach, running containers with --rm will also remove the volume.
# Otherwise, clean up orphaned volumes with `docker rm -v [container name]` or `docker volume prune`
# RUN npm install && mv node_modules ../
RUN npm install

# COPY . .    => not necessary for development, as the source code is mounted in the docker run command

# override in the build command with --build-arg DEFAULT_PORT=5000
ARG DEFAULT_PORT=8000

# alternatively, specify --env/-e PORT=8000 (once for each variable) in the docker run command (doing so will override the value set here)
ENV PORT=$DEFAULT_PORT
EXPOSE $PORT
CMD ["npm", "run", "dev"]

FROM base AS production
ENV NODE_ENV=production
RUN npm install --production --silent
COPY . .
EXPOSE 8000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
