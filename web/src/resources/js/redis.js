var GPV = GPV || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
GPV.REDIS = function () {

    var page;

    var init = function (pageValue) {
        console.debug("GPV.REDIS INIT");

        page = pageValue;


        var id = GPV.UTIL.uriParam("id");
        $("#searchString").val(id);
        search(id);

        bindButtonSearch();
    };

    var search = function(){
        var searchString = $("#searchString").val();

        var url = 'http://' + GPV.SYSTEM.gpvURL() + '/gpv-webservices/resources/cache/value/'+ page + ':' + searchString;
        $.get(url, function (result) {
            $("#result").html('<pre>' + JSON.stringify(result) + '</pre>');
            $("#resultURL").html('<a href="' + url + '" target="_blank">Ver</a>')
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            GPV.SYSTEM.consoler("Falha ao buscar. " +jqXHR.status+ " - " + jqXHR.statusText);
        });
    };
    
    var bindButtonSearch = function () {
        $("#search").click(function (event) {
            event.preventDefault();
            search();
        });
    };

    return {
        init: init
    }

}();