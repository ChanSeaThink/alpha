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
    OriginalPicture：原图的路径。
    CompressedPicture：缩略图的路径。
    '''
    UserID = models.ForeignKey('lnr.User')
    Title = models.CharField(max_length = 200)
    Time = models.DateTimeField()
    ShortContent = models.CharField(max_length = 400)
    LongContent = models.TextField()
    OriginalPicture = models.TextField()
    CompressedPicture = models.TextField()

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

