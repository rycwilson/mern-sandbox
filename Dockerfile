FROM node:lts-alpine
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm install --production --silent; \
    else \
      npm install && mv node_modules ../; \
    fi
COPY . .
EXPOSE 8000
RUN chown -R node /app
USER node
CMD ["/bin/sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm start; else npm run dev; fi"]