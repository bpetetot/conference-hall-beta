#!make
MAKEFLAGS += --silent

all: webapp server

server:
	@echo "Building server..."
	cd server && \
	npm ci --also=dev && \
	npm run prod:migrate && \
	npm run prod:build && \
	npm prune --production

webapp:
	@echo "Building webapp..."
	cd webapp && \
	npm ci --also=dev && \
	npm run build && \
	npm prune --production

start:
	@echo "Starting server..."
	cd server && \
	npm run prod:start

.PHONY: all server webapp start
