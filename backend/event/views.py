from flask import Flask, request, session, redirect, url_for, render_template, flash
from flask import jsonify
from .models import User, db, Event, Registration
import flask_praetorian
from backend.event import app
from base64 import b64decode, b64encode
from six.moves.urllib.parse import quote, unquote
from re import search

guard = flask_praetorian.Praetorian()


class DecodeError(Exception):
    pass


def decode(encoded_str):
    """Decode an encrypted HTTP basic authentication string. Returns a tuple of
    the form (email, password), and raises a DecodeError exception if
    nothing could be decoded.
    """
    split = encoded_str.strip().split(' ')

    # If split is only one element, try to decode the username and password
    # directly.
    if len(split) == 1:
        try:
            email, password = b64decode(split[0]).decode().split(':', 1)
        except:
            raise DecodeError

    # If there are only two elements, check the first and ensure it says
    # 'basic' so that we know we're about to decode the right thing. If not,
    # bail out.
    elif len(split) == 2:
        if split[0].strip().lower() == 'basic':
            try:
                email, password = b64decode(split[1]).decode().split(':', 1)
            except:
                raise DecodeError
        else:
            raise DecodeError

    # If there are more than 2 elements, something crazy must be happening.
    # Bail.
    else:
        raise DecodeError

    return unquote(email), unquote(password)


@app.route('/')
def index():
    return jsonify(status=200)


@app.route('/api/signup', methods=['GET', 'POST'])
def signup():
    req = request.get_json(force=True)
    log = User.query.filter_by(email=req['email']).first()
    if log != None:
        return jsonify({'error': 'You have already signed up using this email', 'status': 401})
    if request.method == 'POST':
        reg = User(firstname=req['firstname'], lastname=req['lastname'], \
                   username=req['username'], password=req['password'], \
                   institution=req['institution'], occupation=req['occupation'],
                   email=req['email'].lower())
        db.session.add(reg)
        db.session.commit()
        return jsonify(status=200)
    else:
        return jsonify({'error': 'shouldnt get to here', 'status': 500})


@app.route('/api/login', methods=['POST'])
def login():
    req = request.get_json(force=True)
    auth_token = request.headers['Authorization']
    email, password = decode(auth_token)
    print(email)
    req['email'] = req['email'].lower()
    log = User.query.filter_by(email=req['email']).first()
    if log == None:
        return jsonify({'error': 'email doesnt exit', 'status': 500})
    if log.password == req['password']:
        return jsonify({'status': 200, 'token': auth_token})
    else:
        return jsonify({'error': 'email doesnt exit', 'status': 500})


@app.route('/api/reserve', methods=['POST'])
def reserve_event():
    req = request.get_json(force=True)
    auth_token = request.headers['x-access-token']
    email, password = decode(auth_token)
    log = User.query.filter_by(email=email.lower()).first()
    print("email", email)
    print(log)
    if request.method == 'POST':
        reserve = Registration(log.uid, req['event_id'], req['description'])
        db.session.add(reserve)
        db.session.commit()
        return jsonify({'status': 200, 'token': auth_token})
    else:
        return jsonify({'error': 'shouldnt get to here', 'status': 500})


@app.route('/api/user', methods=['GET'])
def list_users():
    auth_token = request.headers['x-access-token']
    email, password = decode(auth_token)
    log = User.query.filter_by(email=email.lower()).first()
    if request.method == 'GET':
        return jsonify({'status': 200,
                        'token': auth_token,
                        'firstname': log.firstname,
                        'lastname': log.lastname,
                        'username': log.username,
                        'institution': log.institution,
                        'occupation': log.occupation
                        })
    else:
        return jsonify({'error': 'shouldnt get to here', 'status': 500})


@app.route('/api/events', methods=['GET'])
def show_events():
    all_events = Event.query.all()
    events_data = []
    for event in all_events:
        events_data.append({
            'event_id': event.event_id,
            'creator_id': event.creator_id,
            'event_name': event.event_name,
            'city': event.city,
            'state': event.state,
            'location': event.location,
            'cost': event.cost,
            'date': event.date,
            'capacity': event.capacity,
            'duration': event.duration,
            'description': event.description
        })
    return jsonify(events_data)


@app.route('/api/events/<token>', methods=['GET'])
def get_user_events(token):
    email, password = decode(token)
    log = User.query.filter_by(email=email.lower()).first()
    events = Event.query.filter_by(creator_id=log.uid).all()
    events_data = []
    for event in events:
        events_data.append({
            'event_id': event.event_id,
            'creator_id': event.creator_id,
            'event_name': event.event_name,
            'city': event.city,
            'state': event.state,
            'location': event.location,
            'cost': event.cost,
            'date': event.date,
            'capacity': event.capacity,
            'duration': event.duration,
            'description': event.description
        })
    return jsonify(events_data)


@app.route('/api/new_events', methods=['POST'])
def create_events():
    req = request.get_json(force=True)
    auth_token = request.headers['x-access-token']
    email, password = decode(auth_token)
    log = User.query.filter_by(email=email.lower()).first()
    if request.method == 'POST':
        date = str(req['year']) + "-" + str(req['month']) + "-" + str(req['day'])
        new_event = Event(log.uid, req['event_name'], req['city'],
                          req['state'], req['location'], req['cost'],
                          req['capacity'], date,
                          req['duration'], req['description'])
        db.session.add(new_event)
        db.session.commit()
        return jsonify({'status': 200, 'token': auth_token})
    else:
        return jsonify({'error': 'shouldnt get to here', 'status': 500})


@app.route('/api/list_reserves', methods=['GET'])
def show_reservaton():
    auth_token = request.headers['x-access-token']
    email, password = decode(auth_token)
    log = User.query.filter_by(email=email.lower()).first()
    response_data = []
    if request.method == 'GET':
        reservations = Registration.query.filter_by(ruid=log.uid).all()
        for reserve in reservations:
            event = Event.query.filter_by(event_id=reserve.reid).first()
            user = User.query.filter_by(uid=event.creator_id).first()
            response_data.append({
                'creator': user.username,
                'event_name': event.event_name,
                'duration': event.duration,
                'date': event.date,
                'city': event.city,
                'state': event.state,
                'description': event.description,
                'note': reserve.description,
                'event_id': event.event_id
            })
        return jsonify(response_data)


@app.route('/api/search/',methods=['GET'])
def get_search_result():
    auth_token = request.headers['x-access-token']
    args = request.args
    email, password = decode(auth_token)
    events = Event.query.all()
    events_data = []
    for event in events:
        date = str(args['year']) + "-" + str(args['month']) + "-" + str(args['day'])
        if event.event_name.lower() not in args["event_name"].lower() \
                and args["event_name"].lower() not in event.event_name.lower()\
                and args["event_name"]!='':
            continue
        elif event.cost > int(args["cost"]) and int(args["cost"])!=0:
            print("cost")
            continue
        elif event.date != date and date !="0-0-0":
            print("date")
            continue
        elif event.city.lower() not in args["city"].lower() \
                and args["city"].lower() not in event.city.lower() and args["city"]!='':
            continue


        events_data.append({
            'event_id': event.event_id,
            'creator_id': event.creator_id,
            'event_name': event.event_name,
            'city': event.city,
            'state': event.state,
            'location': event.location,
            'cost': event.cost,
            'date': event.date,
            'capacity': event.capacity,
            'duration': event.duration,
            'description': event.description
        })
    return jsonify(events_data)


if __name__ == '__main__':
    app.run()
