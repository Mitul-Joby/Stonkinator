from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM
from datetime import datetime, timedelta
import yahoo_fin.stock_info as si
import pandas as pd
import numpy as np

class Stock_Predictor:
    def __init__(self, ticker):
        self.response = {
            'status': 200,
            'message': 'success'
        }
        self.ticker = ticker
        self.date = datetime.now().strftime("%Y-%m-%d")
        self.name = self.date + '_' + self.ticker 

    def get_data(self) -> pd.DataFrame:
        try:            
            data = si.get_data(self.ticker, start_date='2010-01-01')
        except AssertionError as e: 
            self.response['status'] = 400
            self.response['message'] = 'Invalid ticker'
            return self.response
        except:
            try :
                data = si.get_data(self.ticker)
            except:
                self.response['status'] = 500
                self.response['message'] = 'Invalid ticker'
                return self.response
        self.data = data [ ['close'] ]
        return self.data

    def preprocess_data(self) -> pd.DataFrame:
        data = self.data
        scaler = MinMaxScaler(feature_range=(0,1))
        scaled_data = scaler.fit_transform(data)
        self.scaler = scaler
        self.scaled_data = scaled_data
        return self.scaled_data

    def split_data(self):
        scaled_data = self.scaled_data
        training_data_len = int(len(scaled_data) * 0.8)
        train_data = scaled_data[0:training_data_len, :]
        x_train = []
        y_train = []
        for i in range(60, len(train_data)):
            x_train.append(train_data[i-60:i, 0])
            y_train.append(train_data[i, 0])
        x_train, y_train = np.array(x_train), np.array(y_train)
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
        self.x_train = x_train
        self.y_train = y_train
        return self.x_train, self.y_train

    def get_test_data(self):
        scaled_data = self.scaled_data
        training_data_len = int(len(scaled_data) * 0.8)
        test_data = scaled_data[training_data_len - 60: , :]
        x_test = []
        y_test = self.data[training_data_len:]
        for i in range(60, len(test_data)):
            x_test.append(test_data[i-60:i, 0])
        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
        self.x_test = x_test
        self.y_test = y_test
        return self.x_test, self.y_test

    def build_model(self) -> Sequential:
        model = Sequential()
        model.add(LSTM(50, return_sequences=True, input_shape=(self.x_train.shape[1], 1)))
        model.add(LSTM(50, return_sequences=False))
        model.add(Dense(25))
        model.add(Dense(1))
        model.compile(optimizer='adam', loss='mean_squared_error')
        model.fit(self.x_train, self.y_train, batch_size=1, epochs=1)
        self.model = model
        return self.model

    def predict(self) -> pd.DataFrame:
        self.predictions = self.model.predict(self.x_test)
        self.predictions = self.scaler.inverse_transform(self.predictions)
        self.predictions = self.predictions
        self.predictions = pd.DataFrame(self.predictions, columns=['close'])
        self.predictions['date'] = self.y_test.index
        self.predictions = self.predictions.set_index('date')
        return self.predictions

    def evaluate(self) -> float:
        self.rmse = np.sqrt(mean_squared_error(self.y_test, self.predictions))
        return self.rmse

    def predict_next_day(self):
        last_60_days = self.data[-60:].values
        last_60_days_scaled = self.scaler.transform(last_60_days)
        X_test = []
        X_test.append(last_60_days_scaled)
        X_test = np.array(X_test)
        X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))
        pred_price = self.model.predict(X_test)
        pred_price = self.scaler.inverse_transform(pred_price)
        return pred_price[0][0], self.date

    def predict_next_5_days(self):
        self.get_data()
        if self.data is not None:
            self.preprocess_data()
            self.split_data()
            self.get_test_data()
            self.build_model()
            self.predict()
            self.evaluate()
            pred_prices = []
            dates = []
            for i in range(5):
                pred_price, date = self.predict_next_day()
                self.data = self.data.append(pd.DataFrame({'close': pred_price}, index=[date]))
                pred_prices.append(float(pred_price))
                dates.append(str(date))
                self.date = (datetime.strptime(self.date, "%Y-%m-%d") + timedelta(days=1)).strftime("%Y-%m-%d")

            return {
                'error': False,
                'data': {
                    'name': self.name,
                    'ticker': self.ticker,
                    'date': str(datetime.today().strftime("%Y-%m-%d")),
                    'predictions': pred_prices,
                    'dates': dates,
                    'rmse': float(self.rmse),
                    'created_at': str(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
                }
            }
        else:
            return {
                'error': True,
                'ticker': self.ticker,
                'message': 'Invalid ticker'
            }
