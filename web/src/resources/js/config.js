var GPV = GPV || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
GPV.CONFIG = function () {

    var GPV_URL = "gpv-prod.ns2online.com.br";
    var backoffice = true;

    var gpvURL = function(){
        return GPV_URL;
    };

    var isBackoffice = function() {
        return backoffice;
    };

    var init = function () {
        console.info("GPV.CONFIG INIT");
        console.info("GPV.URL:", gpvURL());
        console.info("GPV.backoffice:", isBackoffice());
    };

    return {
        init: init,
        gpvURL: gpvURL,
        isBackoffice: isBackoffice
    }

}();
