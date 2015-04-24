# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_datacount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='datacount',
            name='UserCount',
        ),
    ]
