from django.conf.urls import patterns
from django.conf.urls import url

urlpatterns = patterns(
    '',
    url(r'^song/(?P<id>\d+)/?$',
        'words.views.song',
        name='song-lyrics'),

    url(r'^/?$',
        'words.views.index',
        name='index'),

    url(r'^(?P<id>\d+)/?$',
        'words.views.index',
        name='song-page')
)
