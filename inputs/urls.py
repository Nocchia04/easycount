from django.urls import path
from . import views

urlpatterns = [
    path("edit_inputs/", views.edit_inputs, name="edit_inputs"),
    path("get_earnings/", views.get_earnings, name="get_earnings"),
    path("new_operator/", views.new_operator, name="new_operator"),
    path("get_operators_inputs/", views.get_inputs_operators, name="get_operators"),
    path("delete_operator/", views.delete_operator, name="delete_operator"),
    path("new_earning/", views.new_earning, name="new_earning"),
    path("get_inputs/", views.get_inputs, name="get_inputs" ),
    path("delete_input/", views.delete_input, name="delete_input"),
    path("delete_operator_input/", views.delete_operator_input, name="delete_operator_input"),
    path("edit_operators_inputs/", views.edit_operators_inputs, name="edit_operators_inputs"),
    path("get_operators/", views.get_operators, name="get_operators"),
    path("delete_earning/", views.delete_earning, name="delete_earning"),
    path("change_profile_picture/", views.change_profiile_picture, name="change_profile_picture"),
    path("change_username/", views.change_username, name="change_username"),
]