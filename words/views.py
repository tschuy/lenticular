from django.http import HttpResponse
from django.shortcuts import render
from words.models import Song, Lyric

import json


def song(request, id=None):
    song = Song.objects.get(id=id)
    return HttpResponse(
        json.dumps(song.get_json()),
        content_type="application/json")

def index(request, id=None):
    if not id:
        id = Song.objects.order_by('?')[0].id
    return render(request, 'index.html', {'id': id})
