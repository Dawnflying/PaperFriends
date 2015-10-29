from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from .models import UserInfo
from .models import PaperInfo
from .models import Question
from .models import Comment
import json
# Create your views here.
# @csrf_exempt
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([p.question_text for p in latest_question_list])
    return HttpResponse(output)

def register(request):
    print request
    print request.POST
    print ("in hello")
    req = request.POST
    username = req['username']
    password = req['password']
    email = req['email']
    retData = {}
    retData['info']=''
    try:
        user = UserInfo(name=username)
        retData['info']='Already Exist!'
    except ObjectDoesNotExist:
        newuser = UserInfo(name=username, password=password, email=email)
        newuser.save()
        retData['info'] = 'Register Successed!'
    jsondata = json.dump(retData)
    return HttpResponse(jsondata)

def get_comments(request)
    req = request.POST
    retData={}
    retData['info'] = ''
    paperId = req['paperId']
    commentId = req['commentId']
    try:
        paper = PaperInfo(paperId=paperId)

    except ObjectDoesNotExist:
        retData['info'] = 'get comments error!'