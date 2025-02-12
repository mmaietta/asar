ARG NODE_VERSION="20.10"
# Ignore logged warning.
# Force `--platform` so that a consistent arch is used when building this docker test image on mac arm64
FROM --platform=linux/x86_64 node:$NODE_VERSION-slim

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install --no-install-recommends -y xvfb xauth yarn libasound2 libgtk-3-0 libnss3 libxss1 libxtst6 xvfb libgbm-dev

WORKDIR /app