from stonkinator.factory import create_app

import os
import configparser

config = configparser.ConfigParser()
config.read(os.path.abspath(os.path.join(".env")))

if __name__ == "__main__":
    app = create_app()
    app.config['DEBUG'] = True
    app.config['MONGO_URI'] = config['STONKINATOR']['MONGO_URI']
    app.config['SESSION_MONGODB'] = config['STONKINATOR']['MONGO_URI']
    PORT = config['STONKINATOR']['PORT']
    app.run(port=PORT)
    
    