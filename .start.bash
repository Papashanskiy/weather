#!/bin/bash

. venv/bin/activate

cd project

export FLASK_APP=__init__.py

export FLASK_DEBUG=1

flask run
