from pymongo import MongoClient
from bson import ObjectId

uri = "mongodb+srv://hidev23group:cAQi0GhgXAcHdZIR@hidev.a25livf.mongodb.net/?retryWrites=true&w=majority&appName=HiDev"
client = MongoClient(uri)
db = client['easycount']
users_collection = db['credentials']


email = 'example'
password = 'password'
username = 'username'
id = str(ObjectId())

users_collection.insert_one({
    'id': id,  # Assicurati di importare ObjectId da bson
    'email': email,
    'password': password  # Assicurati di avere la password già crittografata
})

users_collection = db['user-info']
users_collection.insert_one({
    'id': id,
    'username' : username,
    'profile_image' : ''
}) 

users_collection = db['user-earnings']
users_collection.insert_one({
    'id' : id,
    'earnings' : []
})

users_collection = db['user-operators']
users_collection.insert_one({
    'id' : id,
    'operators' : []
})


users_collection = db['user-inputs']
users_collection.insert_one({
    'id' : id,
    'params' : {},
    'composite_settings' : {}
})

users_collection = db['user-inputs-operators']
users_collection.insert_one({
    'id' : id,
    'params' : {},
    'composite_settings' : {}
})

