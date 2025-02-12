ARG NODE_VERSION="20.10"
# Ignore logged warning.
# Force `--platform` so that a consistent arch is used when building this docker test image on mac arm64
FROM --platform=linux/x86_64 node:$NODE_VERSION-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install --no-install-recommends -y yarn libasound2 libgtk-3-0 libnss3 libxss1 libxtst6 libgbm-dev xvfb xauth

ENV HOME=/home/test-runner
ENV APP_DIR=/app

ARG USER_UID=1001
ARG USER_GID=1001

RUN groupadd -g $USER_GID test-group \
  && useradd -m -g $USER_GID -u $USER_UID --shell /bin/bash test-runner \
  && mkdir $APP_DIR \
  && chown -R test-runner:test-group $HOME \
  && chown -R test-runner:test-group $APP_DIR

WORKDIR $APP_DIR
USER test-runner