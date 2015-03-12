from django.conf.urls import patterns, include, url
from django.contrib import admin

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'lenticular.views.home', name='home'),
    url(r'^', include('words.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
