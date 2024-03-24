# Variables
PROJECT_SLUG := ai-chat
APP_NAME := $(PROJECT_SLUG)-backend

# Targets
build:
	docker build -t $(APP_NAME) .

dev:
	uvicorn main:app --host 0.0.0.0 --port $(PORT)  --reload

format:
	black .
	ruff --fix .
