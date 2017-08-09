var webContents = require('electron');
var request = require('request') ;
var $ = require('jquery');

var device = 'Dev Cave/';
var server = 'http://localhost:5005/';
var state = {};
var clips = {};
var playbackState;


document.addEventListener("DOMContentLoaded", function () {

var getState = function() {
  request(server+device+'state', function (error, response, body) {
    state = JSON.parse(body);
    renderController();
  })
}
getState();

var getClips = function() {
  request(server+'listClips', function (error, response, body) {
    clips = JSON.parse(body);
    renderClips();
  })
}
getClips();

// Render
var renderController = function(){

  $('.controller__art').attr('src', state.currentTrack.absoluteAlbumArtUri);
  $('.controller__artist').html(state.currentTrack.artist);
  $('.controller__title').html(state.currentTrack.title);
  if (state.playbackState == "PLAYING") {
    $('.controller__play').hide();
    $('.controller__pause').show();
  } else {
    $('.controller__play').show();
    $('.controller__pause').hide();
  }

}


// Control Functions
var play = function(){
  request(server+'play');
  renderController();
}

var pause = function(){
  request(server+'pause');
  renderController();
}

var next = function(){
  request(server+'next');
  renderController();
}

var previous = function(){
  request(server+'previous');
  renderController();
}

// Controller Buttons
$('.controller__play').click( function(){
  play();
});

$('.controller__pause').click( function(){
  pause();
});

$('.controller__next').click( function(){
  next();
});

$('.controller__previous').click( function(){
  previous();
});

// Clips
var renderClips = function(){

  clipCommand = device+'clip/';

  Object.entries(clips).map( function(clip){
      //map
      $('.soundboard').append(
        '<button class="soundboard__clip" href="'+clip[1].file+'/'+'">'+clip[0]+'</button>'
      );

      // click functions
      $('.soundboard__clip').click( function(){
        var currentClip = $(this).attr("href");
        console.log(server+clipCommand+currentClip);
        request(server+clipCommand+currentClip);
      })

  });
}


}); // end DOM Loaded
