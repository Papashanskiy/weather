from flask import Flask, request, make_response, jsonify, abort, render_template
import os
from .weather import get_city, get_weather

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['STATIC_FOLDER'] = os.path.join(BASE_DIR, 'static')
app.config['API_KEY'] = '319322ebe6dc1c639977d9acf0c11a60'


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/api/get_user_info', methods=['POST'])
def get_user_info():
    req = request.form['name']
    result = get_city.get_city_names_openweathermap(req)
    return make_response(jsonify(result=result[0:25]))


@app.route('/api/get_weather_by_id', methods=['POST'])
def get_weather_by_id():
    req = request.form['id']
    result = get_weather.get_weather_by_id(id=req)
    return make_response(jsonify(result=result))
