var PANDOX = PANDOX || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
PANDOX.CONFIG = function () {

    var URL = "127.0.0.1:8080";

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
