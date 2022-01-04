#!/bin/bash

cd /home/eugenio/Sviluppo/eugenio-fastify/frontend/build_keycloak

docker rm keycloak-testing-container || true

docker build . -t frontend/keycloak-hot-reload

docker run \
   -p 8080:8080 \
   --name keycloak-testing-container \
   -e KEYCLOAK_USER=admin \
   -e KEYCLOAK_PASSWORD=admin \
   -e JAVA_OPTS=-Dkeycloak.profile=preview \
   -v /home/eugenio/Sviluppo/eugenio-fastify/frontend/build_keycloak/src/main/resources/theme/frontend:/opt/jboss/keycloak/themes/frontend:rw \
   -it frontend/keycloak-hot-reload:latest
