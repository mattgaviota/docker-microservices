FROM tiangolo/uvicorn-gunicorn-fastapi:python3.6

COPY ./app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip3 install -r requirements.txt
