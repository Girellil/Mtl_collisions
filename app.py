#Import libraries
import requests
from flask import Flask, jsonify, render_template, request
from pymongo import MongoClient
import json
from bson import json_util
from db_credentials import mongo_pass


#Create Flask App
app = Flask(__name__, static_url_path='/static')

#Call DB
client = MongoClient("mongodb+srv://lucasagirelli:" + mongo_pass + "@girellil.nqz2prr.mongodb.net/")
db = client['collisions_db']

collection = db["mtl_collisions"]


############################# WEBAPP APIs  ###############################
#============================HomePage Start===============================
@app.route("/")
def welcome():
    return render_template('index.html')
#============================HomePage End===============================

#============================API-Full-Collection========================

@app.route('/api/allcollisions/')
def apiallcollisions():

    data = list(collection.find())
    
    # Convert ObjectId to string in each document
    for item in data:
        item['_id'] = str(item['_id'])

    final_df_dict = data.to_dict(orient='records')

    return jsonify(final_df_dict)

#============================API-Full-Collection========================

#Run App
if __name__ == '__main__':
    app.run(debug=True)



