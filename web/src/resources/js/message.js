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
                    console.log("CADASTRADO", result)
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

