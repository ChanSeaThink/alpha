# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CachePicture',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ImagePath', models.ImageField(upload_to=b'pictures')),
                ('UserName', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='CompressedPicture',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ImagePath', models.ImageField(upload_to=b'compressedpictures')),
                ('PassageID', models.ForeignKey(to='blog.Passage')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='OriginalPicture',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ImagePath', models.ImageField(upload_to=b'pictures')),
                ('PassageID', models.ForeignKey(to='blog.Passage')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.RemoveField(
            model_name='passage',
            name='CompressedPicture',
        ),
        migrations.RemoveField(
            model_name='passage',
            name='OriginalPicture',
        ),
    ]
