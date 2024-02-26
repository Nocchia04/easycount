from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http import JsonResponse
from easycount.pymogo_interface import connect_to_db, cursor_to_json
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework_simplejwt.tokens import RefreshToken
import base64
from datetime import datetime, timedelta

@csrf_exempt
@api_view(['POST'])
def login(request):
    email = request.POST['email']
    password = request.POST['password']
    collection = connect_to_db('credentials')
    user = collection.find_one({'email': email, 'password': password})
    if user:
        collection = connect_to_db('user-info')
        id = user['id']
        user_info = collection.find_one({'id' : id})
        refresh = RefreshToken()
        user['_id'] = str(user['_id'])
        refresh['user'] = user
        if user_info['profile_image'] != "" : 
            profile_immage = base64.b64encode(user_info['profile_image']).decode('utf-8')
        else:
            profile_immage = user_info["profile_image"]
        return JsonResponse({
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'user_id' : user['id'],
            'username' : user_info['username'],
            'profile_image' : profile_immage,
            'status' : 'success'
        }, safe=False)
    else: 
         return JsonResponse({
             'status' : 'error',
             'description' : 'credentials do not match',
         })


@csrf_exempt
@api_view(['POST'])
def contact_form(request):
    name = request.POST['name']
    surname = request.POST['surname']
    email = request.POST['email']
    description = request.POST['description']

    subject = name + ' ' + surname + ' ' + " from Easy Count"

    send_mail(
        subject,
        description,
        "hidev23.group@gmail.com",
        ["hidev23.group@gmail.com"],
        fail_silently=False
    )


    html_message = render_to_string("email.html")
    plain_message = strip_tags(html_message)


    message = EmailMultiAlternatives(
        subject = "Easy Count by HiDev",
        body = plain_message,
        from_email = "HiDev",
        to=[email],
    )

    message.attach_alternative(html_message, "text/html")
    message.send()


    response = {
        'status': 'success',
    }
    return JsonResponse(response, safe=False)

@csrf_exempt
@api_view(['POST'])
def total_earnings(request):
    id = request.POST['id']
    param = request.POST['param']
    collection = connect_to_db('user-inputs')
    cursor = collection.find({'id' : id})
    users = cursor_to_json(cursor)
    user_inputs = users[0]
    params = user_inputs['params']
    keys_to_remove = [key for key, value in params.items() if value == 'composite']
    for key in keys_to_remove:
        del params[key]
    
    collection = connect_to_db('user-earnings')
    cursor = collection.find({'id' : id})
    users = cursor_to_json(cursor)
    user_earnings = users[0]
    earnings = user_earnings['earnings']
    total = 0
    if param == "undefined":
        param = list(params.keys())[0]
    for earning in earnings:
        if param in earning:
            total = total + earning[param]
    return JsonResponse({'status' : 'success', 'total' : total})


@csrf_exempt
@api_view(['POST'])
def week_graph_earnings(request):
    id = request.POST['id']
    collection = connect_to_db('user-earnings')
    param = request.POST['param']
    cursor = collection.find({'id' : id})
    users = cursor_to_json(cursor)
    user_earnings = users[0]
    earnings = user_earnings['earnings']
    collection = connect_to_db('user-inputs')
    cursor = collection.find({'id' : id})
    users = cursor_to_json(cursor)
    user_inputs = users[0]
    params = user_inputs['params']
    today = datetime.today()
    current_week_start = today - timedelta(days=today.weekday())
    week_start = current_week_start.strftime("%d-%m-%Y")
    current_week_start = datetime.strptime(week_start, "%d-%m-%Y")
    current_week_end = current_week_start + timedelta(days=6)
    week_end = current_week_end.strftime("%d-%m-%Y")
    current_week_end = datetime.strptime(week_end, "%d-%m-%Y")
    result = [
        { "Giorno" : 1, "euro" : 0},
        { "Giorno" : 2, "euro" : 0},
        { "Giorno" : 3, "euro" : 0},
        { "Giorno" : 4, "euro" : 0},
        { "Giorno" : 5, "euro" : 0},
        { "Giorno" : 6, "euro" : 0},
        { "Giorno" : 7, "euro" : 0},
    ]
    if param == "undefined":
        param = list(params.keys())[0]
    for earning in earnings: 
        date = datetime.strptime(earning['date'], "%d-%m-%Y")
        if current_week_start <= date <= current_week_end:
            if param in earning:
                    day_of_week = date.weekday()
                    for elem in result:
                        if elem["Giorno"] == day_of_week +1:
                            elem["euro"] += earning[param]
                     
    return JsonResponse({
        'status' : 'success',
        'data' : result
     })

@csrf_exempt
@api_view(['POST'])
def monthly_graph_earnings(request):
    id = request.POST['id']
    param = request.POST['param']
    collection = connect_to_db('user-earnings')
    cursor = collection.find({'id' : id})
    users = cursor_to_json(cursor)
    user_earnings = users[0]
    earnings = user_earnings['earnings']
    collection = connect_to_db('user-inputs')
    cursor = collection.find({'id' : id})
    users = cursor_to_json(cursor)
    user_inputs = users[0]
    params = user_inputs['params']
    today = datetime.today()
    today_str = today.strftime('%d-%m-%Y')
    today = datetime.strptime(today_str, '%d-%m-%Y')
    result = [
        {"Mese" : 1, "euro" : 0},
        {"Mese" : 2, "euro" : 0},
        {"Mese" : 3, "euro" : 0},
        {"Mese" : 4, "euro" : 0},
        {"Mese" : 5, "euro" : 0},
        {"Mese" : 6, "euro" : 0},
        {"Mese" : 7, "euro" : 0},
        {"Mese" : 8, "euro" : 0},
        {"Mese" : 9, "euro" : 0},
        {"Mese" : 10, "euro" : 0},
        {"Mese" : 11, "euro" : 0},
        {"Mese" : 12, "euro" : 0},
    ]
    if param == "undefined":
        param = list(params.keys())[0]
    for earning in earnings:
        date = datetime.strptime(earning['date'], "%d-%m-%Y")
        if today.year == date.year:
            if param in earning:
                month = date.month
                for elem in result:
                    if elem["Mese"] == month:
                        elem["euro"] += earning[param]
    return JsonResponse({
        'status' : 'success',
        'data' : result
     })