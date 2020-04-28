from flask import Flask, request, make_response, jsonify, abort, render_template
import os
from project.weather import get_city

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['STATIC_FOLDER'] = os.path.join(BASE_DIR, 'static')


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/get_user_info', methods=['POST'])
def get_user_info():
    req = request.form['name']
    print(req)
    result = get_city.get_city_names(req)
    return make_response(jsonify(result=result[0:25]))
