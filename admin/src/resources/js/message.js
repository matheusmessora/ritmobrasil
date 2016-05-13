var PANDOX = PANDOX || {};


PANDOX.MESSAGE = function () {


    var init = function () {
        console.debug("PANDOX.MESSAGE.INIT");


        $.get("http://" + PANDOX.CONFIG.url() + "/message", function(response) {

            for(var key in response) {
                var data = response[key];
                render(data);
            }
        });
    };

    var bindTrash = function() {
        $(".fa-trash").click(function (event) {
            event.preventDefault();

            var element = $(this);
            var id = element.attr("x-id");

            $.ajax({
                url: 'http://' + PANDOX.CONFIG.url() + '/message/' + id,
                type: 'DELETE',
                success: function(result) {
                    $("#pedido-" + id).hide();
                },
                fail: function(jqXHR, textStatus, errorThrown) {
                    console.error("FERROU", jqXHR.status);
                }
            });
        });
    };

    function render(data) {
        $.get("/admin/pedido.html", function(response) {
            var html = response;

            var model = data;
            console.log("model", model, html);
            var processedHTML = PANDOX.TEMPLATE.replacer(html, model);
            $("#pedidos").append(processedHTML);
            bindTrash();
        });

    }

    return {
        init: init
    }

}();



$(document).ready(function(){
    PANDOX.MESSAGE.init();
});

