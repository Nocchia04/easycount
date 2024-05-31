from pymongo import MongoClient
import bson.json_util as json_util
import ast

def cursor_to_json(cursor):
    list_cursor = list(cursor)
    json_string = json_util.dumps(list_cursor)
    json = ast.literal_eval(json_string)
    return json


def connect_to_db(db):
    DATABASE_NAME = 'easycount'
    DATABASE_HOST = 'localhost'
    DATABASE_PORT = '27017'
    USERNAME = ''
    PASSWORD = ''
    REGIONS_COLLECTION = db
    db_handle, mongo_client = get_db_handle(DATABASE_NAME, DATABASE_HOST, DATABASE_PORT, USERNAME, PASSWORD)
    collection_handle = get_collection_handle(db_handle, REGIONS_COLLECTION)
    return collection_handle


def get_db_handle(db_name, host, port, username, password):
    uri = "mongo_uri"
    client = MongoClient(uri)
    db_handle = client[db_name]
    return db_handle, client

def get_collection_handle(db_handle,collection_name):
    return db_handle[collection_name]
