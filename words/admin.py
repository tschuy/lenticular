from django.contrib import admin
from words.models import Lyric, Song

class LyricAdminInline(admin.TabularInline):
    model = Lyric

class SongAdmin(admin.ModelAdmin):
    inlines = (LyricAdminInline, )

admin.site.register(Song, SongAdmin)
