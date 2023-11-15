from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from easycount.pymogo_interface import connect_to_db, cursor_to_json

@csrf_exempt
@api_view(['POST'])
def login(request):
    email = request.POST['email']
    password = request.POST['password']
    collection = connect_to_db('credentials')
    cursor = collection.find({'email': email, 'password': password})
    res = cursor_to_json(cursor)
    if res != []:
        response = {
            'status' : 'success',
            'data' : res
        }
    else: 
        response = {
            'status' : 'error',
            'data' : 'email and password do not match'
        }
    return JsonResponse(response, safe=False)