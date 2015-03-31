# -*- coding: utf8 -*-
from django.db import models

# Create your models here.
class User(models.Model):
    '''
    此类描述的是用户信息表。

    id：Django默认创建。
    UserAccount：用户注册的邮箱。
    UserName：用户的昵称。
    UserPassword：用户密码的哈西值。
    UserPermission：用户权限，
                    0:仅有阅读权限
                    1:有评论权限
                    2:有发表权限。
    Time：用户账号创建时间。
    LastLoginTime：用户最近一次登录时间。
    '''
    UserAccount = models.EmailField()
    UserName = models.CharField(max_length = 30)
    UserPassword = models.CharField(max_length = 200)
    UserPermission = models.IntegerField()
    Time = models.DateTimeField()
    LastLoginTime = models.DateTimeField()