from flask_sqlalchemy import SQLAlchemy
from backend.event import app
db = SQLAlchemy(app)


class User(db.Model):
    uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    username = db.Column(db.String(50), unique=True, index=True)
    password = db.Column(db.String(50))
    institution = db.Column(db.String(50))
    occupation = db.Column(db.String(50))
    email = db.Column(db.String(50), unique=True, index=True)

    def __init__(self, firstname, lastname, username, password, email, institution, occupation):
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.password = password
        self.email = email
        self.institution = institution
        self.occupation = occupation

class Event(db.Model):
    event_id = db.Column(db.Integer,primary_key=True, autoincrement=True)
    creator_id = db.Column(db.Integer,db.ForeignKey('user.uid'))
    event_name = db.Column(db.String(50))
    city = db.Column(db.String(50))
    state = db.Column(db.String(50))
    location = db.Column(db.String(50))
    cost = db.Column(db.Integer)
    capacity = db.Column(db.Integer)
    date = db.Column(db.Integer)
    duration = db.Column(db.String(50))
    description = db.Column(db.String(200))

    def __init__(self, creator_id, event_name, city, state, location, cost, capacity, date, duration, description):
        self.creator_id = creator_id
        self.event_name = event_name
        self.city = city
        self.state = state
        self.location = location
        self.cost = cost
        self.capacity = capacity
        self.date = date
        self.duration = duration
        self.description = description

class Registration(db.Model):
    rid = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ruid = db.Column(db.Integer, db.ForeignKey('user.uid'))
    reid = db.Column(db.Integer, db.ForeignKey('event.event_id'))
    description = db.Column(db.String(200))

    def __init__(self, ruid, reid, description):
        self.reid = reid
        self.ruid = ruid
        self.description = description




db.create_all()
