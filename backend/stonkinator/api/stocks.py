from flask_cors import CORS
from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify, session
from stonkinator.db import create_prediction, get_user_predictions
import yahoo_fin.stock_info as si
import yahoo_fin.news as news

stocks_api = Blueprint('stocks_api', 'stocks_api', url_prefix='/api/stocks')
CORS(stocks_api)

@stocks_api.route('/<string:stock>', methods=['GET'])
def api_get_stock(stock):
    stock = stock.upper()
    try:
        stats = si.get_stats(stock)
        company = si.get_company_info(stock) 
        price = si.get_live_price(stock)

        stats = stats.fillna("")
        company = company.fillna("")
        stats = stats.to_numpy().tolist()
        company = company.to_dict()['Value']

        return jsonify({"error":False, "stats": stats, "company": company, "price": price, "stock": stock})
       
    except:
        return jsonify({"error":True, "message":"Stock not found"}), 404

@stocks_api.route('/sp500', methods=['GET'])
def api_get_sp500():
    date = (datetime.today() - timedelta(days=50)).strftime('%Y-%m-%d')
    index = si.get_data('^GSPC', start_date=date, index_as_date=False)
    index['DATE'] = index["date"].astype(str)
    index['LOW'] = index['low'].round(5)
    index['HIGH'] = index['high'].round(5)
    index['OPEN'] = index['open'].round(5)
    index['CLOSE'] = index['close'].round(5)
    index['ADJCLOSE'] = index['adjclose'].round(5)
    index['VOLUME'] = index['volume']
    index = index[['DATE', 'CLOSE', 'OPEN', 'HIGH', 'LOW', 'ADJCLOSE', 'VOLUME']]
    response = {
        "error": False,
        "index": "S&P 500",
        "sp500": index.to_dict('records')
    }
    return jsonify(response)

@stocks_api.route('/dowjones', methods=['GET'])
def api_get_dowjones():
    date = (datetime.today() - timedelta(days=50)).strftime('%Y-%m-%d')
    index = si.get_data('^DJI', start_date=date, index_as_date=False)
    index['DATE'] = index["date"].astype(str)
    index['LOW'] = index['low'].round(5)
    index['HIGH'] = index['high'].round(5)
    index['OPEN'] = index['open'].round(5)
    index['CLOSE'] = index['close'].round(5)
    index['ADJCLOSE'] = index['adjclose'].round(5)
    index['VOLUME'] = index['volume']
    index = index[['DATE', 'CLOSE', 'OPEN', 'HIGH', 'LOW', 'ADJCLOSE', 'VOLUME']]
    response = {
        "error": False,
        "index": "Dow Jones",
        "dowjones": index.to_dict('records')
    }
    return jsonify(response)

@stocks_api.route('/nasdaq', methods=['GET'])
def api_get_nasdaq():
    lastMonth = (datetime.today() - timedelta(days=30)).strftime('%Y-%m-%d')
    index = si.get_data('^IXIC', start_date=lastMonth, index_as_date=False)
    index['DATE'] = index["date"].astype(str)
    index['LOW'] = index['low'].round(5)
    index['HIGH'] = index['high'].round(5)
    index['OPEN'] = index['open'].round(5)
    index['CLOSE'] = index['close'].round(5)
    index['ADJCLOSE'] = index['adjclose'].round(5)
    index['VOLUME'] = index['volume']
    index = index[['DATE', 'CLOSE', 'OPEN', 'HIGH', 'LOW', 'ADJCLOSE', 'VOLUME']]
    response = {
        "error": False,
        "index": "NASDAQ",
        "nasdaq": index.to_dict('records')
    }
    return jsonify(response)

@stocks_api.route('/day-gainers', methods=['GET'])
def api_get_day_gainers():
    gainers = si.get_day_gainers()
    gainers.fillna("", inplace=True)
    response = {
        "error": False,
        "entries": len(gainers),
        "gainers": gainers.to_numpy().tolist()
    }
    return jsonify(response)

@stocks_api.route('/day-losers', methods=['GET'])
def api_get_day_losers():
    losers = si.get_day_losers()
    losers.fillna("", inplace=True)
    response = {
        "error": False,
        "entries": len(losers),
        "losers": losers.to_numpy().tolist()
    }
    return jsonify(response)

@stocks_api.route('/day-most-active', methods=['GET'])
def api_get_day_most_active():
    most_active = si.get_day_most_active()
    most_active.fillna("", inplace=True)
    response = {
        "error": False,
        "entries": len(most_active),
        "most_active": most_active.to_numpy().tolist()
    }
    return jsonify(response)

@stocks_api.route('/data/<string:stock>', methods=['GET'])
def api_get_stock_data(stock):
    stock = stock.upper()
    date = (datetime.today() - timedelta(days=50)).strftime('%Y-%m-%d')
    try :
        data = si.get_data(stock, start_date=date, index_as_date=False)
        data['DATE'] = data["date"].astype(str)
        data['LOW'] = data['low'].round(5)
        data['HIGH'] = data['high'].round(5)
        data['OPEN'] = data['open'].round(5)
        data['CLOSE'] = data['close'].round(5)
        data['ADJCLOSE'] = data['adjclose'].round(5)
        data['VOLUME'] = data['volume']
        data = data[['DATE', 'CLOSE', 'OPEN', 'HIGH', 'LOW', 'ADJCLOSE', 'VOLUME']]
        response = {
            "error": False,
            "stock": stock,
            "data": data.to_dict('records')
        }
    except Exception as e:
        response = {
            "error": True,
            "message": str(e)
        }
    return jsonify(response)


@stocks_api.route('/news/<string:stock>', methods=['GET'])
def api_get_stock_news(stock):
    stock = stock.upper()
    try: 
        articles = news.get_yf_rss(stock)
        response = {
            "error": False,
            "stock": stock,
            "articles": articles
        }
    except:
        response = {
            "error": True,
            "stock": stock,
            "articles": []
        }
    return jsonify(response)

@stocks_api.route('/predict', methods=['POST'])
def predict():
    if 'user' not in session:
        return jsonify({"error": True, "message": "Not logged in"}), 401
    user = session['user']
    data = request.get_json()
    ticker = data['stock']
    ticker = ticker.upper()
    try:
        past60days = si.get_data(ticker, start_date=(datetime.today() - timedelta(days=60)).strftime('%Y-%m-%d'), index_as_date=False)
        past60days['DATE'] = past60days["date"].astype(str)
        past60days['CLOSE'] = past60days['close'].round(5)
        past60days = past60days[ ['DATE', 'CLOSE'] ]
        past60days = past60days.tail(60)
    except:
        return jsonify({"error": True, "message": "Invalid stock symbol"}), 400
    
    result = create_prediction(user['username'], ticker)
    if not result['created']:
        return jsonify({"error": True, "message": result['message'], "error" : result['error']}), 400
    else:
        prediction = result['prediction']
        response = {
            "error": False,
            "stock": ticker,
            "past60days": past60days.to_dict('records'),
            "prediction": prediction
        }
        return jsonify(response)

@stocks_api.route('/predictions', methods=['GET'])
def get_predictions():
    if 'user' not in session:
        return jsonify({"error": True, "message": "Not logged in"}), 401
    user = session['user']
    result = get_user_predictions(user['username'])
    response = {
        "error": False,
        "data": result
    }
    return jsonify(response)
    
@stocks_api.errorhandler(404)
def not_found(e):
    return jsonify({"status":404, "message":"Not found"})
