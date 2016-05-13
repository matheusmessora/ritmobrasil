var PANDOX = PANDOX || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
PANDOX.CONFIG = function () {

    var URL = "ritmobrasil.local:8090/api";

    var getURL = function(){
        return URL;
    };

    var init = function () {
        console.info("PANDOX.CONFIG INIT");
        console.info("PANDOX.URL:", getURL());
    };

    return {
        init: init,
        url: getURL
    }

}();
