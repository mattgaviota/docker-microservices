FROM tiangolo/uwsgi-nginx-flask:python3.8-alpine

RUN apk --no-cache add build-base bash postgresql-dev

WORKDIR /app

COPY ./app/requirements.txt ./

RUN pip install -U pip && pip install -r requirements.txt

