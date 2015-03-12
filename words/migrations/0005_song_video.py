# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('words', '0004_lyric_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='video',
            field=models.CharField(default=b'', max_length=100, verbose_name=b'YouTube URL'),
            preserve_default=True,
        ),
    ]
