# -*- coding:utf-8 -*-
from django.shortcuts import render
# from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from .models import UserInfo
from .models import PaperInfo
from .models import Question
from .models import TagInfo
from .models import Comment
import json
# Create your views here.
# @csrf_exempt
def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([p.question_text for p in latest_question_list])
    return HttpResponse(output)

def register(request):
    req = request.POST
    data = req.keys()[0]
    jsondata = json.loads(data)
    username = jsondata['username']
    password = jsondata['password']
    email = jsondata['email']
    direction = jsondata['direction']
    major = jsondata['major']
    retdata = {}
    retdata['info'] = ''
    print username + password
    try:
        print '11'
        user = UserInfo(name=username)
        print '22'
        retdata['info'] = 'User Existed!!'
        print '33'
    except ObjectDoesNotExist:
        print '1'
        newuser = UserInfo(name=username, password=password, email=email, direction=direction, major=major)
        print '2'
        newuser.save()
        print '3'
        retdata['info'] = 'Registeration Success!'
    jsondata = json.dumps(retdata, ensure_ascii=False)
    print jsondata
    return HttpResponse(jsondata)

def get_comments(request):
    req = request.POST
    retData={}
    retData['info'] = ''
    paperId = req['paperId']
    commentId = req['commentId']
    try:
        paper = PaperInfo(paperId=paperId)

    except ObjectDoesNotExist:
        retData['info'] = 'get comments error!'
    return HttpResponse(json.dump(retData),status=200,content_type='application/x-www-form-urlencoded; charset=utf-8')

def save_comments(request):
    req = request.POST
    print request
    print req
    timestamp = req['timestamp']
    comment = req['comment']
    username = req['username']
    ret = {}
    try:
        user = UserInfo(username=username)
        newComment = Comment(user=user,cotent=comment,timestamp=timestamp)
        newComment.save()
    except ObjectDoesNotExist:
        ret['info'] = "user error"
    response = HttpResponse(json.dump(ret))
    response['Access-Control-Allow-Origin'] = '*'
    return response

def get_file_info(request):
    print request
    info = {}
    id = int(request.GET.get('id'))
    paper = PaperInfo(paperId=id)
    abst = paper.abstraction
    tagInfos = TagInfo.objects.filter(paper=paper)
    tags =''
    for tag in tagInfos:
        tags += tag.tagContent + ' '

    info['title']=paper.title
    info['abstraction']=abst
    info['tags'] = tags
    jsondata = json.dumps(info, ensure_ascii=False)
    print jsondata
    return HttpResponse(jsondata)

def set_file_info(request):
    return HttpResponse('haha')