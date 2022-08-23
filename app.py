from flask import (
    Flask,
    redirect,
    jsonify,
    request,
    session,
    g
)

from werkzeug.security import generate_password_hash, check_password_hash
import psycopg2
from .db import get_db, close_db

app = Flask(__name__)
app.secret_key = 'mochi the kitty'


@app.before_request
def connect_to_db():
    get_db()


@app.after_request
def disconnect_from_db(response):
    close_db()
    return response

##############
# GET ALL SOUND FILE UNDER LANGUAGE
##############

##############
# GET ALL SOUND FILE UNDER USER
##############

##############
# DELETE SOUND FILE
##############

##############
# EDIT SOUND FILE DESC
##############

##############
# CREATE SOUND FILE
##############


@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    password_hash = generate_password_hash(password)
    query = """
        INSERT INTO users
        (username, password_hash)
        VALUES (%s, %s)
        RETURNING id, username
    """
    cur = g.db['cursor']
    try:
        cur.execute(query, (username, password_hash))
    except psycopg2.IntegrityError:
        return jsonify(success=False, msg='Username already taken')

    g.db['connection'].commit()
    user = cur.fetchone()
    session['user'] = user
    return jsonify(success=True, user=user)


@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    query = """
        SELECT * FROM users
        WHERE username = %s
    """
    cur = g.db['cursor']
    cur.execute(query, (username,))
    user = cur.fetchone()
    # if username does not exist
    if user is None:
        return jsonify(success=False, msg="Username or password is incorrect")

    # check if the password is correct
    is_match = check_password_hash(user['password_hash'], password)

    if not is_match:
        return jsonify(success=False, msg='Username or password is incorrect')
    # remove unnecessary info given to the client
    user.pop('password_hash')
    session['user'] = user
    return jsonify(success=True, user=user)


@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify(success=True)


# @app.route('/am-i-logged-in')
# def test():
#     print(session['user'])
#     return jsonify(session['user'])

@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)
    else:
        return jsonify(success=False, msg='User is not logged in')
