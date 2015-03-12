# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('words', '0003_song_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='lyric',
            name='time',
            field=models.IntegerField(default=2000, verbose_name=b'Length of lyric (ms)'),
            preserve_default=True,
        ),
    ]
