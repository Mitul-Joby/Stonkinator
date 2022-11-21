from flask_cors import CORS
from flask import Blueprint, request, jsonify, session
from stonkinator.db import create_user, get_user, update_user, delete_user

account_api = Blueprint('account_api', 'account_api', url_prefix='/api/account')
CORS(account_api)

def expexted_keys(data, keys):
    if not data:
        return jsonify({"error":True, "message":f"Expected keys: {keys}"}), 400
    for key in keys:
        if key not in data:
            return jsonify({"error":True, "message":f"Expected keys: {keys}"}), 400
    return True

@account_api.route('/check', methods=['GET', 'POST'])
def check():
    if 'user' in session:
        return jsonify({"signedIn": True, "user": session['user']})
    else:
        return jsonify({"signedIn": False, "user": None})

@account_api.route('/signup', methods=['POST'])
def api_signup():
    data = request.get_json()
    expected = expexted_keys(data, ['name', 'email', 'username', 'password'])
    if expected is not True:
        return expected
    name = data['name']
    email = data['email']
    username = data['username']
    password = data['password']

    if ' ' in username:
        return jsonify({ "created": False, "message": "Username cannot have spaces" }), 400
    username = username.lower()

    if len(password) < 8:
        return jsonify({ "created": False, "message": "Password must be at least 8 characters" }), 400
    
    response = create_user(name, email, username, password)

    if response['created']:
        return jsonify(response), 201
    else:
        if response.get('error'):
            print(response['error'])
            return jsonify({ "created": False, "message": "User not created" }), 500
        return jsonify(response), 400

@account_api.route('/signin', methods=['POST'])
def api_signin():
    data = request.get_json()
    expected = expexted_keys(data, ['usernameEmail', 'password'])
    if expected is not True:
        return expected    
    usernameEmail = data['usernameEmail']
    password = data['password']

    if len(password) < 8:
        return jsonify({ "authenticated": False, "message": "Password must be at least 8 characters" }), 400

    response = get_user(usernameEmail, password)
    if response['authenticated']:
        session['user'] = response['user']
        return jsonify(response), 200
    else:
        if response.get('error'):
            print(response['error'])
            return jsonify({ "authenticated": False, "message": "User not authenticated" }), 500
        return jsonify(response), 400

@account_api.route('/signout', methods=['GET', 'POST'])
def logout():
    session.clear() 
    return jsonify({ "signedOut": True, "message": "Signed Out Successfully" }), 200
