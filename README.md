# Docker Microservices

This is a example about how to work using microservices approach to build
a web application.

We are using `docker` and `docker-compose` to handle our microservices.

## Requisites

1. Install Docker
2. Install Docker Compose

## Setup

1. Clone the repo by: `git clone git@github.com:mattgaviota/docker-microservices.git`
2. Go to project folder: `cd docker-microservices`
3. Create `.env` file: `cp api-php/src/.env.example api-php/src/.env`
4. Setup docker images: `docker-compose up -d`
5. Install missing dependencies for php service and execute migrations and seeders:
  - `docker exec -it --user $(id -u):$(id -g) [container id] bash`
  - `composer install`
  - `php artisan migrate -- seed`
6. Go to `http://localhost:3000` to check the result
