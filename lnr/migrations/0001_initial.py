# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('UserAccount', models.EmailField(max_length=75)),
                ('UserName', models.CharField(max_length=30)),
                ('UserPassword', models.CharField(max_length=200)),
                ('UserPermission', models.IntegerField()),
                ('Time', models.DateTimeField()),
                ('LastLoginTime', models.DateTimeField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
