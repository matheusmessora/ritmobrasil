var PANDOX = PANDOX || {};


PANDOX.LIVE = function () {
    
    

    var init = function () {
        console.debug("PANDOX.LIVE.INIT");

        loadLive();
    };



    var loadLive = function() {
        setTimeout(function () {
            $.ajax({
                url: 'http://' + PANDOX.CONFIG.url() + '/live',
                type: 'GET',
                success: function (result) {
                    $("#hoster").html(result.hoster);
                    $("#showName").html(result.showName);
                    if(result.live){
                        $(".badge-live").show();
                    }else {
                        $(".badge-live").hide();
                    }

                },
                fail: function (jqXHR, textStatus, errorThrown) {
                    console.error("FERROU", jqXHR.status);
                }
            });
            loadLive();
        }, 5000);
    };

    return {
        init: init
    }

}();



$(document).ready(function(){
    PANDOX.LIVE.init();
});

