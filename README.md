# testing_with_cypress
# installing linux dependencies
# Install Xvfb and other necessary packages:
sudo apt-get update
sudo apt-get install -y xvfb gtk2-engines-pixbuf
sudo apt-get install -y xfonts-cyrillic xfonts-100dpi xfonts-75dpi xfonts-base xfonts-scalable
sudo apt-get install -y dbus-x11

#  Xvfb to run in the background:
Xvfb :99 -ac &
export DISPLAY=:99

# Install Cypress dependencies:
sudo apt-get install -y libgtk2.0-0 libgtk-3-0 libnotify-dev libgconf-2-4
sudo apt-get install -y libnss3 libxss1 libasound2 libxtst6 xauth

# Run Cypress tests:
npx cypress open
npx cypress run

# x11 Display over Webpage - setup
mkdir .devcontainer

cd .devcontainer
touch Dockerfile

Paste this into the Dockerfile
---

# Change this line based on your requirements
FROM public.ecr.aws/bitnami/node:16 AS dev 

# https://docs.cypress.io/guides/continuous-integration/introduction#Dependencies
RUN apt-get update && \
    export DEBIAN_FRONTEND=noninteractive && \
    apt-get -y install --no-install-recommends \
        libgtk2.0-0 \
        libgtk-3-0 \
        libgbm-dev \
        libnotify-dev \
        libgconf-2-4 \
        libnss3 \
        libxss1 \
        libasound2 \
        libxtst6 xauth xvfb

---

touch docker-compose.yml

Paste this into the docker-compose.yml

---

version: '3'

services:
  dev:
    build:
      context: .
      dockerfile: Dockerfile
    command: sleep infinity
    environment:
      DISPLAY: ":14"
      LIBGL_ALWAYS_INDIRECT: 0
    volumes_from:
      - x11-bridge:rw
    depends_on:
      - x11-bridge

  x11-bridge: # https://github.com/JAremko/docker-x11-bridge
    image: jare/x11-bridge
    volumes:
      - "/tmp/.X11-unix:/tmp/.X11-unix:rw"
    ports:
      - "8080:8080"
    restart: always
    environment:
      MODE: tcp
      XPRA_HTML: "yes"
      DISPLAY: ":14"
      XPRA_TCP_PORT: "8080"
      XPRA_PASSWORD: MUST_BE_SOMETHING # This password can be anything you want.

---

touch devcontainer.json

Paste this into the devcontainer.json

---

{
  "service": "dev",
  "dockerComposeFile": "docker-compose.yml",
  "forwardPorts": [8080],
  "workspaceFolder": "/testing_with_cypress"
}

---

