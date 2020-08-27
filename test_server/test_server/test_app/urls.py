from django.contrib import admin
from django.urls import path, include
from .views import success, error, progress

urlpatterns = [
    path('success', success),
    path('error', error),
    path('progress', progress ),
]
