from flask.cli import FlaskGroup
from project import __init__ as app

cli = FlaskGroup(app)


if __name__ == '__main__':
    cli()
