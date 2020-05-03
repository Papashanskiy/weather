import pandas as pd
from flask import current_app
import json
import os


def get_city_names(s: str) -> list:
    path = os.path.join(current_app.config['STATIC_FOLDER'], 'world-cities.csv')
    df = pd.read_csv(path)

    df.dropna(inplace=True)

    out = df[df['name'].str.lower().str.contains(s.lower(), na=False)]

    return out.values.tolist()  # df['name'].tolist()


def get_city_names_openweathermap(s: str) -> list:
    path = os.path.join(current_app.config['STATIC_FOLDER'], 'city.list.json')
    with open(path, 'r') as file:
        data = pd.DataFrame(json.loads(line) for line in file)

    # df = pd.json_normalize(data)
    print(data)
    return []

if __name__ == '__main__':
    get_city_names('Moscow')
