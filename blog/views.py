# -*- coding: utf8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from blog.models import Passage, Comment, OriginalPicture, CompressedPicture, CachePicture
import time, random
import json

# Create your views here.
def index(request):
    username = request.session.get('username', '')
    #print '(',username,')'
    if username == '':
        #print '---->1'
        return render_to_response('index.html', {'logined':username})
    else:
        #print '---->2'
        return render_to_response('index.html', {'logined':username, 'username':username})

def writting(request):
    username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')
    else:
        return render_to_response('writting.html', {'username':username})

def savePicture(request):
    #print request.FILES
    username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')

    if 'pic' in request.FILES:
        #print '<-------QAQ------>'
        t = int(time.time())
        rn = random.randrange(1,10000)
        addName = str(t) + str(rn)
        image =request.FILES['pic']
        picName = image.name
        #以下两行代码替换掉文件名中的空格，改为下划线，有空格的文件名在存入mysql时会自动转化为下划线。
        #print picName.find(' ')
        picName = picName.replace(' ', '_')
        #print picName
        image.name = addName + picName
        p = CachePicture()
        p.ImagePath = image
        p.UserName = username
        p.ImageName = image.name
        p.save()
        cachePictureObj = CachePicture.objects.get(ImageName = image.name)
        path = '/showPicture/' + image.name
        #print path
        #print cachePictureObj.id
        jsonObject = json.dumps({'pic':'path'},ensure_ascii = False)
        #加上ensure_ascii = False，就可以保持utf8的编码，不会被转成unicode
        return HttpResponse(jsonObject,content_type="application/json")
    else:
        return HttpResponse('图片上传错误。')

def showPicture(request):
    username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')
    print 'Get Pic'
    return HttpResponse('Demo')
