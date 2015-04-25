# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('lnr', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CachePicture',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('ImagePath', models.ImageField(upload_to=b'pictures')),
                ('UserName', models.CharField(max_length=30)),
                ('ImageName', models.CharField(max_length=50)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('UserName', models.CharField(max_length=30)),
                ('Time', models.DateTimeField()),
                ('Content', models.TextField()),
            ],
            options={
                'ordering': ['-Time'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='DataCount',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('PassageCount', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Passage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('Title', models.CharField(max_length=200)),
                ('Time', models.DateTimeField()),
                ('ShortContent', models.CharField(max_length=400)),
                ('LongContent', models.TextField()),
                ('readTimes', models.IntegerField(default=0)),
                ('commentTimes', models.IntegerField(default=0)),
                ('UserID', models.ForeignKey(to='lnr.User')),
            ],
            options={
                'ordering': ['-Time'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Picture',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('OriginalImagePath', models.ImageField(upload_to=b'pictures')),
                ('OriginalImageName', models.CharField(max_length=50)),
                ('CompressedImagePath', models.ImageField(upload_to=b'compressedpictures')),
                ('CompressedImageName', models.CharField(max_length=50)),
                ('PassageID', models.ForeignKey(to='blog.Passage')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='comment',
            name='PassageID',
            field=models.ForeignKey(to='blog.Passage'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='comment',
            name='UserID',
            field=models.ForeignKey(to='lnr.User'),
            preserve_default=True,
        ),
    ]
