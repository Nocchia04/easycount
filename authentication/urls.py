from django.urls import path
from . import views
from django.core.mail import send_mail

urlpatterns = [
    path("login/", views.login, name="login"),
    path("send_mail/", views.contact_form, name="contact_form"),
    path("total_earnings/", views.total_earnings, name="total_earnings"),
    path("week_graph_earnings/", views.week_graph_earnings, name="week_graph_earnings"),
    path("monthly_graph_earnings/", views.monthly_graph_earnings, name="monthly_graph_earnings" )
]