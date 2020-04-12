from fastapi import FastAPI, Request
from middleware import Authenticate

app = FastAPI(openapi_url="/python/openapi.json", docs_url="/api/docs", redoc_url="/api/redoc")

app.add_middleware(Authenticate)

@app.get("/api")
def read_root(request: Request):
    state = request.state
    return {"message": state}