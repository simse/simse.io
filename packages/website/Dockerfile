#### BASE STAGE
#### Installs moon.

FROM ubuntu:24.04 AS base
WORKDIR /app

RUN apt-get update
RUN apt-get install -y curl

# Install moon binary
RUN curl -fsSL https://moonrepo.dev/install/moon.sh | bash
ENV PATH="/root/.moon/bin:$PATH"

#### SKELETON STAGE
#### Scaffolds repository skeleton structures.

FROM base AS skeleton

# Copy entire repository and scaffold
COPY . .

RUN ls .

RUN moon docker scaffold website

#### BUILD STAGE
#### Builds the project.

FROM base AS build

# Copy toolchain
COPY --from=skeleton /root/.proto /root/.proto

# Copy workspace configs
COPY --from=skeleton /app/.moon/docker/workspace .

# Install dependencies
RUN moon docker setup

# Copy project sources
COPY --from=skeleton /app/.moon/docker/sources .

# Build the project
RUN moon run website:build

# Prune extraneous dependencies
# RUN moon docker prune

#### START STAGE
#### Runs the project.

FROM base AS start

# Copy built sources
COPY --from=build /root/.proto /root/.proto
COPY --from=build /app /app

CMD moon run website:start

