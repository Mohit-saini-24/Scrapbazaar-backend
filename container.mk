systemIP := $(notdir $(shell ip a | grep "net " | grep -v "br-\|docker\|vpn\| lo\|tun\|ppp" | awk '{print $$2}' | cut -d "/" -f 1))

docker_compose_file := "compose.yml"

docker_compose_command := "docker-compose"

folder := $(notdir $(shell basename $(PWD)))

loadenv := echo "export systemIP=$(systemIP)">.env.ip;echo "export folder=$(folder)">>.env.ip

start_image := $(docker_compose_command) --env-file .env.ip -f $(docker_compose_file) up -d

stop_image := $(docker_compose_command) --env-file .env.ip -f $(docker_compose_file) down

tail_logs := docker logs -n 50 -f $(folder)

bash := docker exec -it $(folder) bash

ash := docker exec -it $(folder) ash

