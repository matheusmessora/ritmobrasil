var PANDOX = PANDOX || {};


PANDOX.LIVE = function () {


    var init = function () {
        console.debug("PANDOX.LIVE.INIT");

        bindConnect();
        getLive();
    };

    var getLive = function() {
        $.get("http://" + PANDOX.CONFIG.url() + "/live", function (response) {
            console.log(response);

            var $icon = $(".icon-active");
            $icon.html("");
            $($icon[response.id-1]).html('<span class="glyphicon glyphicon glyphicon-equalizer"></span>');
        });
    };


    var bindConnect = function() {
        $(".btn").click(function (event) {
            event.preventDefault();

            var element = $(this);
            var id = element.attr("x-id");

            $.ajax({
                url: 'http://' + PANDOX.CONFIG.url() + '/live/' + id,
                type: 'PUT',
                success: function(result) {
                    getLive();
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
