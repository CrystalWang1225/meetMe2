from flask import Flask

app = Flask(__name__)
app.secret_key = 'hello_world'
app.config.from_object(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///activity.db'

from event import models
from event import views

