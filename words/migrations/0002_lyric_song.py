# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('words', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='lyric',
            name='song',
            field=models.ForeignKey(to='words.Song', null=True),
            preserve_default=True,
        ),
    ]
