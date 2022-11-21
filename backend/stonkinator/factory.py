import os
from flask import Flask, jsonify
from flask.json import JSONEncoder
from flask_cors import CORS
from flask_session import Session
from bson import json_util, ObjectId
from datetime import datetime

from stonkinator.api.stocks import stocks_api
from stonkinator.api.account import account_api

class MongoJsonEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        if isinstance(obj, ObjectId):
            return str(obj)
        return json_util.default(obj, json_util.CANONICAL_JSON_OPTIONS)


def create_app():

    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    STATIC_FOLDER = os.path.join(APP_DIR, 'static')

    app = Flask(__name__, static_folder=STATIC_FOLDER)

    # app.config["SESSION_PERMANENT"] = False
    app.config["SESSION_TYPE"] = "mongodb"
    app.config["SESSION_MONGODB_DB"] = "stonkinator"
    app.config["SESSION_MONGODB_COLLECT"] = "sessions"

    
    Session(app)
    CORS(app)

    app.json_encoder = MongoJsonEncoder

    app.register_blueprint(stocks_api)
    app.register_blueprint(account_api)

    @app.route('/', methods=['GET', 'POST'])
    def online():
        return jsonify({"message":"Backend is running"})

    @app.route('/api', methods=['GET', 'POST'])
    def api():
        return jsonify({"message":"API is running"})

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"status":404, "message":"Not found"}), 404
    
    return app
