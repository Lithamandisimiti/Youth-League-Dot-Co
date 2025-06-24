function killTheRest(){
  for(var temp in allWaves){
    temp.stop();
  }
}

function playOrPauseSong( id ){
  //var temp = pushes.indexOf(id);
  //console.log(temp);
  var tempWaveSurfer = allWaves[id];
  tempWaveSurfer.playPause();
}

function mute( id ){
  var tempWaveSurfer = allWaves[id];
  tempWaveSurfer.toggleMute();
}

function stopPlay( id ){
  var tempWaveSurfer = allWaves[id];
  tempWaveSurfer.stop();
    $('.play').removeClass('ion-ios-pause');
    $('.play').addClass('ion-ios-play');
}

var vol = 1;
function volume( id, dec ){
  var tempWaveSurfer = allWaves[id];
  if(vol < 0 && dec < 0 || vol > 1 && dec > 1){
    return;
  }
  vol += dec;
  //console.log(tempWaveSurfer.getVolume());
  //var newVol = tempWaveSurfer.getVolume() + dec;
  tempWaveSurfer.setVolume(vol);
}
