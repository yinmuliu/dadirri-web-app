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
import os
import cloudinary.uploader

from .db import get_db, close_db

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')


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


@app.route('/language/<lang_code>')
def show_audio_under_lang(lang_code):
    cur = g.db['cursor']
    query = """
        SELECT * 
        FROM files
        JOIN users ON users.id = files.user_id
        WHERE files.language_code = %s
    """
    cur.execute(query, (lang_code,))
    files = g.db['cursor'].fetchall()
    return jsonify(files)


##############
# GET ALL SOUND FILE UNDER USER
##############
@app.route('/user')
def show_all_users():
    cur = g.db['cursor']
    query = """
        SELECT *
        FROM users 
        ORDER BY id DESC
    """
    cur.execute(query)
    users = cur.fetchall()
    return jsonify(users=users)


@app.route('/user/<user_id>')
def show_audio_under_user(user_id):
    cur = g.db['cursor']
    query = """
        SELECT *
        FROM files
        JOIN users ON users.id = files.user_id
        WHERE users.id = %s
        ORDER BY date DESC
    """
    cur.execute(query, (user_id,))
    files = cur.fetchall()
    return jsonify(files=files)

##############
# DELETE SOUND FILE
##############

##############
# EDIT SOUND FILE DESC
##############

##############
# CREATE SOUND FILE
##############


@app.route('/new-recording/<lang_code>', methods=['POST'])
def create(lang_code):
    print(request.files)
    uploaded_file = cloudinary.uploader.upload(
        request.files['audio_file'], resource_type="video")
    print(uploaded_file)
    user = session['user']
    query = """
        INSERT INTO files
        (url, info, language_code, user_id)
        VALUES (%s, %s, %s, %s)
        RETURNING *
    """
    g.db['cursor'].execute(
        query, (uploaded_file['url'], '', lang_code, user['id']))
    g.db['connection'].commit()
    file = g.db['cursor'].fetchone()
    print(file)
    return jsonify(file)


@app.route('/signup', methods=['POST'])
def signup():
    username = request.json['username']
    password = request.json['password']
    print(request.json)
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


@app.route('/am-i-logged-in')
def test():
    print(session['user'])
    return jsonify(session['user'])


@app.route('/is-authenticated')
def is_authenticated():
    user = session.get('user', None)
    if user:
        return jsonify(success=True, user=user)
    else:
        return jsonify(success=False, msg='User is not logged in')
