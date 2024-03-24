.PHONY: help
.EXPORT_ALL_VARIABLES:

PROJECT_SLUG := "ai-chat"
APP_NAME := $(PROJECT_SLUG)-backend

## Start local development environment
start:
	docker compose up --build

## Stop local development environment
stop:
	docker compose down

# Backend Deployment
build:
	docker build -f backend/Dockerfile -t $(APP_NAME) --env-file .env ./backend

stage:
	docker tag $(APP_NAME):latest beafdocker/$(APP_NAME):latest
	docker push beafdocker/$(APP_NAME):latest


# Testing
backend-test:
	cd backend/

	POSTGRES_SERVER=null \
	python -m pytest

frontend-test:
	@cd frontend && npm run test


# Helpers
scaffold:
	@cd scripts && python scaffold.py run -n $(name)
