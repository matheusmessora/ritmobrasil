var GPV = GPV || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
GPV.VERSION = function () {

    var init = function () {
        console.debug("GPV.VERSION INIT");

        load();
        $("#gpvURL").html(GPV.SYSTEM.gpvURL());
    };

    var load = function () {
        $.get("http://" + GPV.SYSTEM.gpvURL() + "/gpv-webservices/resources/versao", function (json) {
            $("#version").html(json.versao);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {});
    };

    return {
        init: init
    }

}();
