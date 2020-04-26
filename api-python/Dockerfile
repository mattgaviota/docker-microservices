FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7-alpine3.8

RUN apk add build-base

COPY ./app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -U pip && pip install -r requirements.txt
