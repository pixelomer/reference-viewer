FROM node:22

# Create app directory
RUN mkdir -p /home/node/app

# Copy files
WORKDIR /home/node/app
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY src src
COPY static static
COPY views views
RUN chown -R node:node /home/node/app

# Build TypeScript
USER node
RUN yarn install
RUN yarn build

# Cleanup
ENV NODE_ENV=production
#RUN npm prune --production

CMD [ "node", "." ]