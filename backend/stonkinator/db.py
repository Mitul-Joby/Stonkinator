from stonkinator.Stock_Predictor import Stock_Predictor
from flask import current_app, g
from werkzeug.local import LocalProxy
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime
import bcrypt

def get_db():
    db = getattr(g, "_database", None)
    if db is None:
        db = g._database = PyMongo(current_app).db
    return db

db = LocalProxy(get_db)

def create_user(name, email, username, password):
    hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    user_doc = { "name": name,
                 "email": email,
                 "username": username,
                 "password": hashedPassword,
                 "predictions": [],
                 "joinedAt": datetime.utcnow(),
                 "lastSignedIn": datetime.utcnow(),
                 "lastUpdated": datetime.utcnow() }
    user = db.users.find_one( { "$or": [ { "username": username }, { "email": email } ] } )
    if user:
        return { "created": False, "message": "User already exists", "user": None }
    else:
        try:
            result = db.users.insert_one(user_doc)
            return { "created": True, "message": "User created successfully", "user": user_doc }
        except Exception as e:
            return { "created": False, "message": "User not created", "user": None, "error": e }


def get_user(usernameEmail, password):
    try:
        user = db.users.find_one( {"$or": [{"username": usernameEmail}, {"email": usernameEmail}]})
        if user:
            if bcrypt.checkpw(password.encode('utf-8'), user['password']):
                result = db.users.update_one(
                    { "_id": ObjectId(user['_id']) },
                    { "$set": { "lastSignedIn": datetime.utcnow() } }
                )
                return { "authenticated": True, "message": "User found", "user": user }
            else:
                return { "authenticated": False, "message": "Incorrect password", "user": None }
        else:
            return { "authenticated": False, "message": "User not found", "user": None }
    except Exception as e:
        return { "authenticated": False, "message": "User not found", "user": None, "error": e }


def update_user(username, password, name, email):
    try:
        user = db.users.find_one({"username": username})
        if user:
            if bcrypt.checkpw(password.encode('utf-8'), user['password']):
                hashedPassword = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
                user_doc = { "name": name,
                             "email": email,
                             "username": username,
                             "password": hashedPassword,
                             "lastUpdated": datetime.utcnow() }
                result = db.users.update
                return { "updated": True, "message": "User updated successfully", "user": result }
            else:
                return { "updated": False, "message": "Incorrect password", "user": None }
        else:
            return { "updated": False, "message": "User not found", "user": None }
    except Exception as e:
        return { "updated": False, "message": "User not updated", "user": None, "error": e }


def delete_user(username, password):
    try:
        user = db.users.find_one({"username": username})
        if user:
            if bcrypt.checkpw(password.encode('utf-8'), user['password']):
                result = db.users.delete_one({"username": username})
                return { "deleted": True, "message": "User deleted successfully", "user": result }
            else:
                return { "deleted": False, "message": "Incorrect password", "user": None }
        else:
            return { "deleted": False, "message": "User not found", "user": None }
    except Exception as e:
        return { "deleted": False, "message": "User not deleted", "user": None, "error": e }


def create_prediction(username, stock):
    try:
        user = db.users.find_one({"username": username})
        if user:
            sp = Stock_Predictor(stock)
            date = datetime.now().strftime("%Y-%m-%d")
            name = date + "_" + stock
            prediction = db.prediction.find_one({"name": name})
            if not prediction:
                predict_result = sp.predict_next_5_days()
                if predict_result['error']:
                    return { "created": False, "message": "Prediction not created", "prediction": None, "error": result['error'] }
                else:
                    data = predict_result['data']
                    prediction = db.prediction.insert_one(data)
            else:
                data = {k: v for k, v in prediction.items() if k != '_id'}
            prediction = db.users.find_one({"username": username, "predictions": {"$elemMatch": {"name": data['name']}}})
            if prediction is None:
                result = db.users.update_one(
                    {"username": username},
                    {"$push": {"predictions": data}}
                )
            return { "created": True, "message": "Prediction created successfully", "prediction": data }
        else:
            return { "created": False, "message": "User not found", "prediction": None }
    except Exception as e:
        return { "created": False, "message": "Prediction not created", "prediction": None, "error": e }


def get_user_predictions(username):
    try:
        user = db.users.find_one({"username": username})
        if user:
            return { "found": True, "message": "Predictions found", "predictions": user['predictions'] }
        else:
            return { "found": False, "message": "Predictions not found", "predictions": None }
    except Exception as e:
        return { "found": False, "message": "Predictions not found", "predictions": None, "error": e }


def delete_prediction(username, predictionId):
    try:
        user = db.users.find_one({"username": username})
        if user:
            result = db.users.update_one(
                {"username": username},
                {"$pull": {"predictions": {"_id": ObjectId(predictionId)}}}
            )
            return { "deleted": True, "message": "Prediction deleted successfully", "prediction": result }
        else:
            return { "deleted": False, "message": "User not found", "prediction": None }
    except Exception as e:
        return { "deleted": False, "message": "Prediction not deleted", "prediction": None, "error": e }
