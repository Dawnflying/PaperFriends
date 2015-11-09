__author__ = 'Administrator'
from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register', views.register),
    url(r'^save_comments', views.save_comments),
    url(r'^get_file_info', views.get_file_info),
    url(r'^set_file_info', views.set_file_info),
]