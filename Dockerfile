FROM node:20
ARG HOME=/home/node

# It is recommended to place those dependencies in the non-root user directory
ENV NPM_CONFIG_PREFIX=$HOME/.npm-global
ENV PATH=$PATH:$HOME/.npm-global/bin
RUN apt-get update && apt-get install -y automake autoconf vim

USER node

WORKDIR $HOME/source

COPY --chown=node:node package.json .
COPY --chown=node:node pnpm-lock.yaml .

RUN rm -rf $HOME/source/node_modules
RUN rm -rf $HOME/source/dist
RUN npm install -g pnpm
RUN pnpm install
COPY --chown=node:node . .

# Ensure the node user has write permissions to the source directory
USER root
RUN chown -R node:node $HOME/source

USER node

RUN pnpm build

ENTRYPOINT ["node", "dist/server.js"]

EXPOSE 3000
