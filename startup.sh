#!/bin/bash

# Comprobamos si Docker está en ejecución
DOCKER_STATUS=$(systemctl is-active docker)

if [ "$DOCKER_STATUS" != "active" ]; then
    echo "Docker no está en ejecución. Iniciando Docker..."
    sudo systemctl start docker
    echo "Docker iniciado."
else
    echo "Docker ya está en ejecución."
fi

# Comandos para levantar tus contenedores Docker
echo "Iniciando tus contenedores Docker..."
docker-compose up -d --build
echo "Contenedores Docker iniciados."

exit 0
