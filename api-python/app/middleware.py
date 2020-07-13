from werkzeug.wrappers import Request, Response, ResponseStream
import requests


class Middleware():
    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        bearer = request.headers.get('authorization')
        if bearer:
            token = bearer.split(" ")[1]
        else:
            token = ''

        if not token:
            res = Response(u'Authorization failed', mimetype= 'text/plain', status=401)
            return res(environ, start_response)
        headers = {'Authorization': bearer}
        validate = requests.get('http://api-php:8080/api/validate', headers=headers)
        validate_response = validate.json()
        if validate_response['errors']:
            res = Response(u'Authorization failed', mimetype= 'text/plain', status=401)
            return res(environ, start_response)
        # request.state.user_id = validate_response['data']['id']
        # request.state.name = validate_response['data']['name']
        # request.state.email = validate_response['data']['email']
        # request.state.usertype = validate_response['data']['usertype']

        environ['user'] = validate_response['data']
        return self.app(environ, start_response)
