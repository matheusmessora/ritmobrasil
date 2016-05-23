var PANDOX = PANDOX || {};


PANDOX.PLAYER = function () {
    
    

    var init = function () {
        console.debug("PANDOX.PLAYER.INIT");

        loadPlayer();


    };



    var loadPlayer = function() {
        var stream = {
                title: "ABC Jazz",
                mp3: "http://shoutcast.umhost.com.br:2006/;?icy=http"
            },
            ready = false;
        $("#jquery_jplayer_1").jPlayer({
            ready: function (event) {
                ready = true;
                $(this).jPlayer("setMedia", stream);
                $(this).jPlayer("play");
            },
            pause: function() {
                $(this).jPlayer("clearMedia");
            },
            error: function(event) {
                if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                    // Setup the media stream again and play it.
                    $(this).jPlayer("setMedia", stream).jPlayer("play");
                }
            },
            play: function(event){
                console.debug("TOCANDO!");
                $(".jp-play").hide();
                $(".jp-stop").show();
            },
            pause: function(event){
                console.debug("PAUSE!");
                $(".jp-play").show();
                $(".jp-stop").hide();
            },
            swfPath: "../../dist/jplayer",
            supplied: "mp3",
            preload: "none",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            keyEnabled: true,
            errorAlerts: true,
            warningAlerts: true
        });
    };

    return {
        init: init
    }

}();



$(document).ready(function(){
    PANDOX.PLAYER.init();
});

