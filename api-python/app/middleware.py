from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
import requests

class Authenticate(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        bearer = request.headers.get('authorization')
        headers = {'Authorization': bearer}
        validate = requests.get('http://api-php:8080/api/validate', headers=headers)
        validate_response = validate.json()
        if validate_response['errors']:
            return JSONResponse(status_code=validate.status_code, content=validate_response)
        request.state.user_id = validate_response['data']['id']
        request.state.name = validate_response['data']['name']
        request.state.email = validate_response['data']['email']
        response = await call_next(request)
        return response