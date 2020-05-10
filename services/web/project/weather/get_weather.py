import requests
from flask import current_app


def get_weather_by_id(id):
    key = current_app.config['API_KEY']
    url = 'http://api.openweathermap.org/data/2.5/weather?id={}&appid={}&units=metric'.format(id, key)
    r = requests.get(url=url)
    if r.status_code == 200:
        return r.text
    else:
        return r.status_code    # TODO Придумал что вернуть тут в случае ошибки
