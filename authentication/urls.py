from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("delete_user/", views.delete_user, name="delete_user"),
]