# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='passage',
            old_name='commentTimes',
            new_name='CommentTimes',
        ),
        migrations.RenameField(
            model_name='passage',
            old_name='readTimes',
            new_name='ReadTimes',
        ),
    ]
