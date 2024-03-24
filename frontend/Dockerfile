# FROM node:18-alpine AS base
FROM node:18-bullseye-slim AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
