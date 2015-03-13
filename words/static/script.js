// load YouTube API

var song;
var player;
var videoDone = false;

function createPlayer() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
    height: '0',
    width: '0',
    videoId: song.youtube,
    events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
    }
    });
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !videoDone) {
        event.target.playVideo();
        runText();
        videoDone = true;
    }
}

function stopVideo() {
    player.stopVideo();
}

function playSong(song_id) {
    getLyrics(song_id);
}

function getLyrics(song_id) {
    var httpRequest;
    makeRequest('song/' + song_id);

    function makeRequest(url) {
        httpRequest = new XMLHttpRequest();

        httpRequest.onreadystatechange = runContent;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

      function runContent() {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            song = JSON.parse(httpRequest.responseText);
            createPlayer();
          } else {
            alert('Song not found!');
          }
      }
    }
}

function runText() {
    var lyrics = song.lyrics;
    lyrics.sort(function(a, b){
        if(a.length < b.length) return -1;
        if(a.length > b.length) return 1;
        return 0;
    });
    for (var lyric in lyrics) {
        switch (lyrics[lyric].color) {
            case "B":
                var textDrawer = drawBlueBackground;
                break;
            case "R":
                var textDrawer = drawRedBackground;
                break;
            case "W":
                var textDrawer = drawWhiteBackground;
                break;
        }
        setTimeout(
            textDrawer.bind(null, lyrics[lyric].french.toUppercase(), lyrics[lyric].english.toUppercase()),
            lyrics[lyric].length);
    }
    setTimeout(stopVideo, lyrics[lyrics.length - 1].length + 1000);
}

function drawBlueBackground(french, english) {
    return drawBackground(french, english, "#0100FB", "xor", "#FFFFFF", "darken", "#ea0003");
}

function drawRedBackground(french, english) {
    return drawBackground(english, french, "#EA0003", "xor", "#FFFFFF", "darken", "#0100FB");
}

function drawWhiteBackground(french, english) {
    return drawBackground(french, english, "#FFFFFF", "darken", "#0100FB", "darken", "#EA0003");
}

function drawBackground(french, english, backgroundFill, composite1, fill1, composite2, fill2) {
    var ctx = document.getElementById('words').getContext('2d');
    var x = window.innerWidth / 2;
    var y = window.innerHeight / 2;
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    ctx.fillStyle = backgroundFill;
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.globalCompositeOperation = composite1;

    ctx.textAlign = 'center';
    ctx.font = '700 100pt Open Sans';

    ctx.fillStyle = fill1;
    wrapText(ctx, french, window.innerWidth / 2, y, window.innerWidth, 150);


    ctx.globalCompositeOperation = composite2;
    ctx.fillStyle = fill2;
    wrapText(ctx, english, window.innerWidth / 2, y, window.innerWidth, 150);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
}
