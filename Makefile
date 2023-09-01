help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  install    to install the project"
	@echo "  start      to start the project"
	@echo "  logs       to show the logs"
	@echo "  stop       to stop the project"

install:
	docker-compose build
	docker-compose run server bash -c "npx sequelize-cli db:migrate"
	
start:
	docker-compose up -d

logs:
	docker-compose logs -f

stop:
	docker-compose down
