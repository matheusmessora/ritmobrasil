var PANDOX = PANDOX || {};


PANDOX.AUDIENCE = function () {


    var getAudience = function() {
        setTimeout(function () {
            $.get("http://" + PANDOX.CONFIG.url() + "/audience", function (response) {
                console.log(response);

                render("ritmobrasil", response.ritmobrasil[0]);
                render("soundpop", response.soundpop[0]);
                render("webputz", response.webputz[0]);
            });
            getAudience();
        }, 500);

    };

    var init = function () {
        console.debug("PANDOX.AUDIENCE.INIT");
        getAudience();
    };

    function render(radio, data) {
        console.log(data);

        var element = $("." + radio);

        var lastValue = element.attr("x-lastValue");
        var lastSign = element.attr("x-lastSign");
        if(!lastSign) {
            lastSign = 1;
        }

        var html = '{{listeners}}';
        var isDecrease = lastValue > data.listeners;
        var isIncrease = lastValue < data.listeners;

        element.attr("x-lastValue", data.listeners);
        console.log("radio=" + radio + ",listener=" + data.listeners + ",last=" + lastValue);
        if(isDecrease){
            element.attr("x-lastSign", 0);
            $("." + radio + "-sign").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
        }else if(isIncrease){
            element.attr("x-lastSign", 1);
            $("." + radio + "-sign").html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
        }else {
            if(lastSign == 1){
                $("." + radio + "-sign").html('<i class="fa fa-chevron-up" aria-hidden="true"></i>');
            }else {
                $("." + radio + "-sign").html('<i class="fa fa-chevron-down" aria-hidden="true"></i>');
            }
        }

        var processedHTML = PANDOX.TEMPLATE.replacer(html, data);
        element.html(processedHTML);

    }

    return {
        init: init
    }

}();
