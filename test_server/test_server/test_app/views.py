from django.shortcuts import render
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def success(request):
    return HttpResponse(json.dumps({"status":"success"}))

@csrf_exempt
def error(request):
    return HttpResponse(json.dumps({"status":"error","reason":"Here!"}))

numb = 0

@csrf_exempt
def progress(request):
    if request:
        global numb 
        numb += 1
        if numb > 10:
            numb = 0
            return HttpResponse(json.dumps({"status1":"progress","timeout":10}))
    return HttpResponse(json.dumps({"status":"progress","timeout":10}))

# Create your views here.
