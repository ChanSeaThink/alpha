# -*- coding: utf8 -*-
from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from blog.models import Passage, Comment, Picture, CachePicture, DataCount
from lnr.models import User
import time, random, json, re, Image, os
from datetime import datetime
from django.conf import settings
#from django.template import Template, Context
# Create your views here.
def index(request):
    username = request.session.get('username', '')
    #print '(',username,')'
    passageLs = Passage.objects.all()[0:8]
    #for pl in passageLs:
    #print pl.Time
    indexDic = []
    for passage in passageLs:
        thumnailLs = Picture.objects.filter(PassageID = passage)
        indexDic.append({'passage':passage, 'thumnailLs':thumnailLs})
    #for ss in indexDic:
    #    print ss
    if username == '':
        #print '---->1'
        return render_to_response('index.html', {'logined':username, 'dic':indexDic})
    else:
        permission = request.session.get('permission', '')
        if permission >= 2:
            writePermission = 'OK'
        else:
            writePermission = ''
        #print '---->2'
        return render_to_response('index.html', {'logined':username, 'username':username, 'dic':indexDic, 'writePermission':writePermission})

def passage(request, ID):
    username = request.session.get('username', '')
    passage = Passage.objects.get(id = int(ID))
    passage.readTimes += 1
    passage.save()
    if username == '':
        #print '---->1'
        return render_to_response('article.html', {'logined':username, 'passage':passage})
    else:
        permission = request.session.get('permission', '')
        if permission >= 2:
            writePermission = 'OK'
        else:
            writePermission = ''
        #print '---->2'
        return render_to_response('article.html', {'logined':username, 'username':username, 'passage':passage, 'writePermission':writePermission})

def writting(request):
    username = request.session.get('username', '')
    permission = request.session.get('permission', '')
    if permission < 2:
        return HttpResponseRedirect('/index')

    if username == '':
        return HttpResponseRedirect('/index')
    else:
        return render_to_response('writting.html', {'username':username})

def change(request, ID):
    username = request.session.get('username', '')
    permission = request.session.get('permission', '')
    if permission < 2:
        return HttpResponseRedirect('/index')
    passageObj = Passage.objects.get(id = int(ID))
    return render_to_response('change.html', {'username':username, 'passage':passageObj})

def saveWritting(request):
    #blog 应用中最重要的试图函数。
    #包括以下主要功能：1，保存博文；2，生成缩略图；3，把缓存表的图片信息移到源图表，然后清空缓存表。
    username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')
    title = request.POST['title']
    text = request.POST['text']
    textNoHtml = re.sub('<[^>]*?>','',text)
    #print len(textNoHtml)
    #print text
    #print textNoHtml
    if len(textNoHtml) < 120:
        shortContent = textNoHtml + '......'
    else:
        shortContent = textNoHtml[0:120] + '......'
    nt = datetime.now()
    #以下是保存博文数据到数据表中。
    passageObj = Passage()
    writerObj = User.objects.get(UserName = username)
    passageObj.UserID = writerObj
    passageObj.Title = title
    passageObj.Time = nt
    passageObj.ShortContent = shortContent
    passageObj.LongContent = text
    passageObj.save()
    #以下是把所有缓存表的图片去处移到源图表，并生成压缩图。
    picSrcLs = re.findall('<img src="(.*?)">',text)
    picNameLs = []
    for pss in picSrcLs:
        if pss[0:13]=='/showPicture/':
            picNameLs.append(pss[13:])
        else:
            continue
    #此变量用于保存文章的ID
    ID = 0
    passageObj = Passage.objects.get(UserID = writerObj, Time = nt)
    ID = passageObj.id
    for pn in picNameLs:
        cpobj = CachePicture.objects.get(ImageName = pn)
        #print 'sss',cpobj.ImagePath.name
        im = Image.open(os.path.join(settings.MEDIA_ROOT, cpobj.ImagePath.name))
        w, h = im.size
        if w > h:
            im.thumbnail((66, (66*h)//w))
        else:
            im.thumbnail(((w*74)//h, 74))
        savepath = os.path.join(settings.MEDIA_ROOT, 'compressedpictures' ,'thumnail'+cpobj.ImageName)
        fm = cpobj.ImageName.split('.')[1]
        if fm.lower() == 'jpg':
            fm = 'jpeg'
        im.save(savepath, fm)
        picObj = Picture()
        picObj.PassageID = passageObj
        picObj.OriginalImageName = pn
        picObj.OriginalImagePath = cpobj.ImagePath
        picObj.CompressedImageName = 'thumnail'+cpobj.ImageName
        picObj.CompressedImagePath.name = os.path.join('compressedpictures' ,'thumnail'+cpobj.ImageName)
        picObj.save()
        cpobj.delete()
    #删除缓存表中的数据以及对应的图片。
    deleteCachePicLs = CachePicture.objects.filter(UserName = username)
    for pic in deleteCachePicLs:
        os.remove(os.path.join(settings.MEDIA_ROOT, pic.ImagePath.name))
        pic.delete()
    dataCountObjLs = DataCount.objects.all()
    dataCountObjLs[0].PassageCount += 1
    dataCountObjLs[0].save()
    return HttpResponseRedirect('/passage/'+ str(ID))

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
        #cachePictureObj = CachePicture.objects.get(ImageName = image.name)
        path = '/showPicture/' + image.name
        #print path
        #print cachePictureObj.id
        jsonObject = json.dumps({'pic':path},ensure_ascii = False)
        #加上ensure_ascii = False，就可以保持utf8的编码，不会被转成unicode
        return HttpResponse(jsonObject,content_type="application/json")
    else:
        return HttpResponse('图片上传错误。')

def showPicture(request, ImgName):
    '''username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')'''
    #print request.META['HTTP_REFERER']
    #判断返回的图片类型
    #picType = ImgName.split('.')[1]
    if request.META.has_key('HTTP_REFERER') == False:
        pictureObj = Picture.objects.get(OriginalImageName = ImgName)
        return HttpResponse(pictureObj.OriginalImagePath, 'image')
    else:
        print 'here'
        if '/writting' in request.META['HTTP_REFERER']:
            cachePictureObj = CachePicture.objects.get(ImageName = ImgName)
            #os.path.join(settings.MEDIA_ROOT, str(p.image))
            #print cachePictureObj.id
            #print cachePictureObj.ImagePath
            #返回存在缓存里的图片
            return HttpResponse(cachePictureObj.ImagePath, 'image')
        elif '/change/' in request.META['HTTP_REFERER']:
            cachePictureObjLs = CachePicture.objects.filter(ImageName = ImgName)
            if len(cachePictureObjLs) != 0:
                return HttpResponse(cachePictureObjLs[0].ImagePath, 'image')
            else:
                pictureObj = Picture.objects.get(OriginalImageName = ImgName)
                return HttpResponse(pictureObj.OriginalImagePath, 'image')
        else:
            pictureObj = Picture.objects.get(OriginalImageName = ImgName)
            return HttpResponse(pictureObj.OriginalImagePath, 'image')

def showThumnail(request, ImgName):
    thumnailObj = Picture.objects.get(CompressedImageName = ImgName)
    return HttpResponse(thumnailObj.CompressedImagePath, 'image')

def saveChange(request, ID):
    username = request.session.get('username', '')
    if username == '':
        return HttpResponseRedirect('/index')
    title = request.POST['title']
    text = request.POST['text']
    textNoHtml = re.sub('<[^>]*?>','',text)

    if len(textNoHtml) < 120:
        shortContent = textNoHtml + '......'
    else:
        shortContent = textNoHtml[0:120] + '......'
    #保存更新之后的文章标题，内容和概述。
    passageObj = Passage.objects.get(id = int(ID))
    passageObj.Title = title
    passageObj.ShortContent = shortContent
    passageObj.LongContent = text
    passageObj.save()

    #picSrcLs获取文中所有图片的路径
    picSrcLs = re.findall('<img src="(.*?)">',text)
    #picNameLs获取文中所有图片的文件名
    picNameLs = []
    for pss in picSrcLs:
        if pss[0:13]=='/showPicture/':
            picNameLs.append(pss[13:])
        else:
            continue
    #picSavedObjLs存储所有已保存的图片数据。
    picSavedObjLs = Picture.objects.filter(PassageID = passageObj)
    #picStayLs用于保存仍然存在的图片名称。
    picStayLs = []
    #以下循环用于判断：图片表中有没有图片在编辑中被删除。
    for picObj in picSavedObjLs:
        if picObj.OriginalImageName in picNameLs:
            picStayLs.append(picObj.OriginalImageName)
            continue
        else:
            os.remove(os.path.join(settings.MEDIA_ROOT, picObj.OriginalImagePath.name))
            os.remove(os.path.join(settings.MEDIA_ROOT, picObj.CompressedImagePath.name))
            picObj.delete()
    #删除picNameLs已存在Picture表中的图片名称,剩下的图片都在PictureCache图片缓存表中。
    for pic in picStayLs:
        picNameLs.remove(pic)

    for pn in picNameLs:
        cpobj = CachePicture.objects.get(ImageName = pn)
        #print 'sss',cpobj.ImagePath.name
        im = Image.open(os.path.join(settings.MEDIA_ROOT, cpobj.ImagePath.name))
        w, h = im.size
        if w > h:
            im.thumbnail((66, (66*h)//w))
        else:
            im.thumbnail(((w*74)//h, 74))
        savepath = os.path.join(settings.MEDIA_ROOT, 'compressedpictures' ,'thumnail'+cpobj.ImageName)
        fm = cpobj.ImageName.split('.')[1]
        if fm.lower() == 'jpg':
            fm = 'jpeg'
        im.save(savepath, fm)
        picObj = Picture()
        picObj.PassageID = passageObj
        picObj.OriginalImageName = pn
        picObj.OriginalImagePath = cpobj.ImagePath
        picObj.CompressedImageName = 'thumnail'+cpobj.ImageName
        picObj.CompressedImagePath.name = os.path.join('compressedpictures' ,'thumnail'+cpobj.ImageName)
        picObj.save()
        cpobj.delete()
    #删除缓存表中的数据以及对应的图片。
    deleteCachePicLs = CachePicture.objects.filter(UserName = username)
    for pic in deleteCachePicLs:
        os.remove(os.path.join(settings.MEDIA_ROOT, pic.ImagePath.name))
        pic.delete()
    return HttpResponseRedirect('/passage/'+ID)

def morePassage(request):
    idNum = int(request.POST['id'].split('/')[2])
    passageLs = Passage.objects.filter(id__lt = idNum)[0:8]
    indexDic = []
    for passage in passageLs:
        thumnailLs = Picture.objects.filter(PassageID = passage)
        indexDic.append({'passage':passage, 'thumnailLs':thumnailLs})
    return render_to_response('morePassage.html', {'dic':indexDic})

def updateDataCount(request):
    username = request.session.get('username', '')
    permission = request.session.get('permission', '')
    if username != '' and permission > 2:
        dataCountObjLs = DataCount.objects.all()
        if len(dataCountObjLs) == 0:
            dataCountObj = DataCount()
            dataCountObj.PassageCount = len(Passage.objects.all())
            dataCountObj.save()
        else:
            dataCountObjLs[0].PassageCount = len(Passage.objects.all())
            dataCountObjLs[0].save()
        return HttpResponse('Update Success.')
    else:
        return HttpResponseRedirect('/index')
