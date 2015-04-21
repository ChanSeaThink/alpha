# -*- coding: utf8 -*-
from django.db import models
#from lnr.models import User

# Create your models here.
class Passage(models.Model):
    '''
    此类用于描述文章的数据库表。

    UserID：用户的id，外键。
    Title：文章标题。
    Time：文章创建时间。
    ShortContent：用于显示在首页的摘要。
    LongContent：文章主体。
    '''
    UserID = models.ForeignKey('lnr.User')
    Title = models.CharField(max_length = 200)
    Time = models.DateTimeField()
    ShortContent = models.CharField(max_length = 400)
    LongContent = models.TextField()
    readTimes = models.IntegerField(default = 0)
    commentTimes = models.IntegerField(default = 0)
    
    class Meta:
        ordering = ['-Time']

class Comment(models.Model):
    '''
    此类用于描述评论的数据库表。

    UserID：用户的id，外键。
    PassageID：文章的id，外键。
    Time：创建时间。
    Content：评论内容。
    '''
    UserID = models.ForeignKey('lnr.User')
    PassageID = models.ForeignKey(Passage)
    Time = models.DateTimeField()
    Content = models.TextField()

class Picture(models.Model):
    '''
    此类用于描述原图以及其对应的缩略图的数据库表。

    PassageID：文章的id，外键。
    OriginalImagePath：保存原图片的路径。
    OriginalImageName：原图片名称。
    CompressedImagePath：保存缩略图片的路径。
    CompressedImageName：缩略图片名称。
    '''
    PassageID = models.ForeignKey(Passage)
    OriginalImagePath = models.ImageField(upload_to='pictures')
    OriginalImageName = models.CharField(max_length= 50)
    CompressedImagePath = models.ImageField(upload_to='compressedpictures')
    CompressedImageName = models.CharField(max_length= 50)

class CachePicture(models.Model):
    '''
    此类用于描述原图缓存的数据库表。

    ImagePath：保存图片的路径。
    UserName：写作者的名字。
    ImageName：图片名称。
    '''
    ImagePath = models.ImageField(upload_to='pictures')
    UserName = models.CharField(max_length = 30)
    ImageName = models.CharField(max_length= 50)