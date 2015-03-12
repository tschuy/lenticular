# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('words', '0002_lyric_song'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='name',
            field=models.CharField(default=b'', max_length=100),
            preserve_default=True,
        ),
    ]
