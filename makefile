
DC = docker compose

build:
	$(DC) up --build

up:
	$(DC) up

down:
	$(DC) down

start:
	$(DC) start

stop:
	$(DC) stop

restart:
	$(DC) down && $(DC) up --build

logs:
	$(DC) logs -f

clean:
	$(DC) down -v --rmi all --remove-orphans

prune:
	docker system prune -a --volumes -f

fresh:
	$(DC) down -v --rmi all
	$(DC) up --build