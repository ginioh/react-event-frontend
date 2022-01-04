FROM jboss/keycloak:15.0.2

USER root

WORKDIR /

ADD configuration /opt/jboss/keycloak/standalone/configuration/

ENTRYPOINT [ "/opt/jboss/tools/docker-entrypoint.sh" ]