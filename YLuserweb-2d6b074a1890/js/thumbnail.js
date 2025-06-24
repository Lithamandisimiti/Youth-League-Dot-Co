$(function(){
    console.log("in");
   $('.audioWave').bind('loadMusic',function(i, obj) {
       console.log("bound");
        if($(this).find("wave").length<1){

            var wavesurfer = WaveSurfer.create({
                container: obj,
                waveColor: 'rgba(0,0,0,.6)',
                progressColor: 'black',
                backend: 'MediaElement'
            });
            wavesurfer.load($(obj).attr('data_song'));
            wavesurfer.on('finish', function(){
              $('.play').removeClass('ion-ios-pause');
              $('.play').addClass('ion-ios-play');
            });
            allWaves[ $(obj).attr('data_id') ] = wavesurfer;
        }
    });


    $().click(function(){
        console.log("clicked");
     $('.audioWave').trigger('loadMusic');
    });
    
});