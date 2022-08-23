from flask import (
    Flask,
    redirect,
    jsonify,
    request,
    g
)

from werkzeug.security import generate_password_hash
from .db import get_db, close_db

app = Flask(__name__)
app.secret_key = 'mochi the kitty'


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

@app.router('/register', methods=['POST'])
def register():
    username = request.json['username']
