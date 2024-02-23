from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from easycount.pymogo_interface import connect_to_db, cursor_to_json
import json
import ast
import base64
from bson.binary import Binary
from datetime import datetime, timedelta


@csrf_exempt
@api_view(['POST'])
def edit_inputs(request):
    data = json.loads(request.body.decode('utf-8'))
    new_settings = data.get('new_settings', [])
    composite_settings = data.get('composite_settings', [])
    id = data.get('id', None)

    collection = connect_to_db('user-inputs')

    query = {
        'id' : id
    }

    update = {
        '$set' : {
            'params' : new_settings,
            'composite_settings' : composite_settings
        }
    }
    try: 
        collection.update_one(query, update, upsert=True)
        response = {
            'status' : 'success',
            'data' : new_settings
        }
    except:
        response = {
            'status' : 'error',
            'data' : []
        }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def get_inputs(request):
    id = request.POST['id']
    try:
        collection = connect_to_db('user-inputs')
        cursor = collection.find({'id' : id})
        json = cursor_to_json(cursor)
        print(id)
        data = json[0]
        
        response = {
            'status' : 'success',
            'data' : data
        }
    except:
        response = {
            'status' : 'error',
            'data' : {}
        }
    return JsonResponse(response, safe=False)


@csrf_exempt
@api_view(['POST'])
def get_earnings(request):
    id = request.POST['id']
    try:
        collection = connect_to_db('user-inputs')
        cursor = collection.find({'id' : id})
        json = cursor_to_json(cursor)
        inputs = json[0]

        collection = connect_to_db('user-earnings')
        cursor = collection.find({'id' : id})
        json = cursor_to_json(cursor)
        data = json[0]

        response = {
            'status' : 'success',
            'inputs' : inputs,
            'data' : data
        }
    except:
        response = {
            'status' : 'error',
            'inputs' : [],
            'data' : []
        }
    
    return JsonResponse(response, safe=False)


@csrf_exempt
@api_view(['POST'])
def delete_operator(request):
    data = json.loads(request.body.decode('utf-8'))
    operator = data.get('operator')
    id = data.get('id', None)
    query = {
        'id' : id
    }
    update = {
        '$pull' : {
            'operators' : operator
        }
    }
    collection = connect_to_db('user-operators')
    collection.update_one(query, update)
    collection = connect_to_db('user-operators')
    cursor = collection.find({'id' : id})
    json_data = cursor_to_json(cursor)
    data_response = json_data[0]

    response = {
        'status' : 'success',
        'data' : data_response
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def change_profiile_picture(request):
    id = request.POST['id']
    image = request.FILES.get('profile_picture')
    collection = connect_to_db('user-info')
    image_data = image.read()
    binary_image = Binary(image_data)
    
    query = {
        'id' : id
    }
    update = {
        '$set' : {
            'profile_image' : binary_image,
        }   
    }
    collection.update_one(query, update)
    collection = connect_to_db('user-info')
    cursor = collection.find({'id' : id})
    json_data = cursor_to_json(cursor)
    data = json_data[0]
    response = {
        'status' : 'success',
        'data': data,
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def change_username(request):
    id = request.POST['id']
    username = request.POST['username']
    collection = connect_to_db('user-info')
    query = {
        'id' : id
    }
    update = {
        '$set' : {
            'username' : username
        }
    }
    collection.update_one(query, update)
    collection = connect_to_db('user-info')
    cursor = collection.find({'id' : id})
    json_data = cursor_to_json(cursor)
    data = json_data[0]
    response = {
        'status' : 'success',
        'data' : data
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def delete_earning(request):
    data = json.loads(request.body.decode('utf-8'))
    earning = data.get('earning')
    id = data.get('id', None)
    query = {
        'id' : id
    }
    update = {
        '$pull' : {
            'earnings' : earning
        }
    }
    collection = connect_to_db('user-earnings')
    collection.update_one(query, update)
    collection = connect_to_db('user-earnings')
    cursor = collection.find({'id' : id})
    json_data = cursor_to_json(cursor)
    data_response = json_data[0]

    response = {
        'status' : 'success',
        'data' : data_response
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def new_earning(request):
    data = json.loads(request.body.decode('utf-8'))
    id = data.get('id', None)
    today = datetime.now()
    date = today.strftime('%d-%m-%Y')
    inputs = data.get('inputs', None)
    for i in inputs:
        t = inputs[i]
        inputs[i] = int(t)
    print(id, date, inputs)
    collection = connect_to_db('user-inputs')
    cursor = collection.find({'id' : id})
    json_data = cursor_to_json(cursor)
    user_inputs = json_data[0]
    params = user_inputs['params']
    composite = user_inputs['composite_settings']
    document = {
        'date' : date,
    }
    for i in params:
        if i in inputs:
            document[i] = inputs[i]
        else:
            expr_string = composite[i]
            result = eval(expr_string, globals(), inputs)
            document[i] = result
        
    collection = connect_to_db('user-earnings')
    query = {
        'id' : id
    }
    update = {
        '$push' : {
            'earnings' : document
        }
    }
    collection.update_one(query, update)

    response = {
        'status' : 'success',
        'data' : document
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def delete_input(request):
    id = request.POST['id']
    input_name = request.POST['input_name']
    try:
        collection = connect_to_db('user-inputs')
        key_to_delete = 'params.' + input_name
        collection.update_one(
            {"id" : id,},
            {'$unset' : { key_to_delete: ""}}
        )
        response = {
            'status' : "success"
        }
    except:
        response = {
            'status' : "error"
        }
    return JsonResponse(response, safe=False)


@csrf_exempt
@api_view(['POST'])
def edit_operators_inputs(request):
    data = json.loads(request.body.decode('utf-8'))

    new_operators_inputs = data.get('new_operators_inputs', [])
    composite_settings = data.get('composite_settings', [])
    id = data.get('id', None)

    collection = connect_to_db('user-inputs-operators')

    query = {
        'id' : id
    }

    update = {
        '$set' : {
            'params' : new_operators_inputs,
            'composite_settings' : composite_settings
        }
    }
    try: 
        collection.update_one(query, update, upsert=True)
        response = {
            'status' : 'success',
            'data' : new_operators_inputs
        }
    except:
        response = {
            'status' : 'error',
            'data' : []
        }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def delete_operator_input(request):
    id = request.POST['id']
    operator_input_name = request.POST['input_name']
    try:
        collection = connect_to_db('user-inputs-operators')
        key_to_delete = 'params.' + operator_input_name
        collection.update_one(
            {"id" : id,},
            {'$unset' : { key_to_delete: ""}}
        )
        response = {
            'status' : "success"
        }
    except:
        response = {
            'status' : "error"
        }
    return JsonResponse(response, safe=False)


@csrf_exempt
@api_view(['POST'])
def new_operator(request):
    data = json.loads(request.body.decode('utf-8'))
    id = data.get('id', None)
    inputs = data.get('inputs', None)
    for i in inputs:
        if ( inputs[i].isdigit()):
            t = inputs[i]
            inputs[i] = int(t)
    collection = connect_to_db('user-inputs-operators')
    cursor = collection.find({'id' : id})
    json_data = cursor_to_json(cursor)
    user_inputs_operators = json_data[0]
    params = user_inputs_operators['params']
    composite = user_inputs_operators['composite_settings']
    print(inputs, params)
    document = {
        
    }
    for i in params:
        if i in inputs:
            document[i] = inputs[i]
        else:
            expr_string = composite[i]
            result = eval(expr_string, globals(), inputs)
            document[i] = result
        
    collection = connect_to_db('user-operators')
    query = {
        'id' : id
    }
    update = {
        '$push' : {
            'operators' : document
        }
    }
    collection.update_one(query, update)

    response = {
        'status' : 'success',
        'data' : document
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def get_inputs_operators(request):
    id = request.POST['id']
    try:
        collection = connect_to_db('user-inputs-operators')
        cursor = collection.find({'id' : id})
        json = cursor_to_json(cursor)
        print(id)
        data = json[0]
        
        response = {
            'status' : 'success',
            'data' : data
        }
    except:
        response = {
            'status' : 'error',
            'data' : {}
        }
    return JsonResponse(response, safe=False)


@csrf_exempt
@api_view(['POST'])
def get_operators(request):
    id = request.POST['id']
    try:
        collection = connect_to_db('user-operators')
        cursor = collection.find({'id' : id})
        json = cursor_to_json(cursor)
        print(id)
        data = json[0]
        
        response = {
            'status' : 'success',
            'data' : data
        }
    except:
        response = {
            'status' : 'error',
            'data' : {}
        }
    return JsonResponse(response, safe=False)