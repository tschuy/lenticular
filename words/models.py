from django.db import models


class Song(models.Model):
    name = models.CharField(max_length=100, default="")

    def get_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'lyrics': [{
                'length': l.time,
                'english': l.english,
                'french': l.french,
                'color': l.color} for l in self.lyric_set.all()] }

    def __unicode__(self):
        return self.name


class Lyric(models.Model):
    english = models.TextField()
    french = models.TextField()
    time = models.IntegerField('Length of lyric (ms)', default=2000)
    song = models.ForeignKey('Song', null=True)

    BLUE = 'B'
    WHITE = 'W'
    RED = 'R'
    COLOR_CHOICES = (
        (BLUE, 'Blue'),
        (RED, 'Red'),
        (WHITE, 'White')
    )
    color = models.CharField(max_length=1, choices=COLOR_CHOICES, default=WHITE)

    def __unicode__(self):
        return self.english
