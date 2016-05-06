var GPV = GPV || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
GPV.SEARCH = function () {

    var page;

    var init = function (pageValue) {
        console.debug("GPV.SEARCH INIT a");

        page = pageValue;
    };

    var search = function(numeroPedido){
        var searchString = numeroPedido;

        GPV.SYSTEM.clearAll();
        $.get('http://' + GPV.SYSTEM.gpvURL() + '/gpv-webservices/resources/filaErro/listarFilaErro', function (filaErro) {

            $.each(filaErro.listaFalhaProcessamento, function (i, falha) {
                var messageID = falha.messageID;

                $.get('http://' + GPV.SYSTEM.gpvURL() + '/gpv-webservices/resources/filaErro/listarPorMessageID/' + messageID, function (mensagem) {


                    var encontrado = JSON.stringify(mensagem.json).indexOf(searchString) > -1;
                    if(encontrado){
                        GPV.SYSTEM.addFalhaProcessamento(i, falha);
                    }
                });
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            GPV.SYSTEM.consoler("Falha ao buscar listarFilaErro. " +jqXHR.status+ " - " + jqXHR.statusText);
        })
    };

    return {
        init: init,
        search: search
    }

}();