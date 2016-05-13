var PANDOX = PANDOX || {};


PANDOX.MESSAGE = function () {
    
    

    var init = function () {
        console.debug("PANDOX.INIT");

        bindSendButton();
    };

    var bindSendButton = function(){
        $("#send-message").click(function (event) {
            event.preventDefault();
            
            var message = $("#text-message").val();
            var name = $("#listener-name").html();

            $.ajax({
                url: 'http://' + PANDOX.CONFIG.url() + '/message',
                data: {
                    message: message,
                    token: 123,
                    name: name
                },
                type: 'POST',
                success: function(result) {
                    $("#pedido-sent-holder").show();
                    $("#loged-holder").hide();
                    setTimeout(testAPI, 15000);
                },
                fail: function(jqXHR, textStatus, errorThrown) {
                    console.error("FERROU", jqXHR.status);
                }
            });
        });
    };

    return {
        init: init
    }

}();



$(document).ready(function(){
    PANDOX.MESSAGE.init();
});

