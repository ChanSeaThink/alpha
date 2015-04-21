# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='passage',
            options={'ordering': ['-Time']},
        ),
        migrations.AddField(
            model_name='passage',
            name='commentTimes',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='passage',
            name='readTimes',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
