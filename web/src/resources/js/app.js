var GPV = GPV || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
GPV.SYSTEM = function () {

    var total = 0;

    var gpvURL = function(){
        return GPV.CONFIG.gpvURL();
    };

    var isBackoffice = function() {
        return GPV.CONFIG.isBackoffice();
    };

    var init = function () {
        console.debug("GPV INIT");
        GPV.UTIL.init();
        GPV.SEARCH.init();
        GPV.CONFIG.init();

        $("#consoler").hide();
        $("#jumbotron").hide();

        showResults(false);

        bindSearchButton();
        bindSendAll();
        bindRefresh();

        GPV.VERSION.init();
    };

    var showResults = function(show){
        if(show){
            $("#listaErroResults").fadeIn();
            $(".is-loading").fadeOut();
        }else {
            $("#listaErroResults").hide();
            $(".is-loading").show();
        }
    };

    var bindSearchButton = function(){
        $(document.body).keyup(function(ev) {
            // 13 == ENTER
            if (ev.which === 13) {
                console.log("APERTOU");
                search($("#query").val());
            }
        });
        $("#searchGoogle").click(function (event) {
            event.preventDefault();
            search($("#query").val());
        });
    };

    var bindRefresh = function(){
        $("#refresh").click(function (event) {
            event.preventDefault();
            showResults(false);
            GPV.SYSTEM.listarFilaErro();
        });
    };

    var bindSendAll = function(){
        $("#sendAll").click(function (event) {
            event.preventDefault();
            $.ajax({
                url: 'http://' + GPV.SYSTEM.gpvURL() + '/gpv-webservices/resources/filaErro/reenviarTodos',
                type: 'PUT',
                success: function(result) {
                    GPV.SYSTEM.jumbotron("Reprocessado com sucesso!");
                    GPV.SYSTEM.clearAll();
                },
                fail: function(jqXHR, textStatus, errorThrown) {
                    GPV.SYSTEM.consoler("Falha ao reprocessar. " +jqXHR.status+ " - " + jqXHR.statusText);
                }
            });
        });
    };

    var search = function(numeroPedido){
        showResults(false);
        GPV.SEARCH.init();
        GPV.SEARCH.search(numeroPedido);
        showResults(true);
    };

    var consoler = function(texto){
        $("#consoler").html('<span style="color: #ffd100;" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> ' + texto);
        $("#consoler").show();
    };


    var jumbotron = function(texto){
        $("#jumbotron").html('<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> <strong>'+ texto + '</strong>');
        $("#jumbotron").show();
    };

    var listarFilaErro = function () {
        clearAll();
        $.get('http://' + GPV.SYSTEM.gpvURL() + '/gpv-webservices/resources/filaErro/listarFilaErro', function (filaErro) {

            if(filaErro.listaFalhaProcessamento.length == 0){
                jumbotron('<strong>Sem críticas!</strong> ');
            }

            var contador = 0;
            total = filaErro.listaFalhaProcessamento.length-1;
            $.each(filaErro.listaFalhaProcessamento, function (i, falha) {
                contador++;
                addFalhaProcessamento(i, falha);
            });

            $("#count").html(contador);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            GPV.SYSTEM.consoler("Falha ao buscar críticas. <br/>" +jqXHR.status+ " - " + jqXHR.statusText);
        })
    };

    var clearAll = function(){
        $("#listarFilaErroTable").html('');
    };

    var addFalhaProcessamento = function(index, falha){
        var correlationID = falha.correlationID;
        if(correlationID === undefined || correlationID === ''){
            correlationID = '<span style="color:red" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> INVÁLIDO'
        }else {
            correlationID = correlationID + ' <a href="/cliente.html?id=' + correlationID + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span><a/>';
        }

        $("#listarFilaErroTable").append('<tr><th scope="row">' + correlationID + '</th><td>' + falha.data + '</td><td>' + falha.filaOrigem + '</td>'
            + '<td>'
            + '<a href="/message.html?id=' + falha.messageID + '"><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button></a>'
            + '&nbsp; <a class="expand" href="#" x-id="' + index + '" x-message="' + falha.messageID + '"></a>'
            + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td colspan="6" id="expand-' + index + '">'
            + '<strong>Pedido</strong>: <span id="expand-' +index+'-pedido"></span> <strong>Erro</strong>: <span id="expand-' +index+'-erro"></span>'
            + '</td>'
            + '</tr>'
        );


        addLog(index, falha.messageID);
    };

    var addLog = function(index, messageID){
        GPV.MENSAGEM.loadMessage(index, messageID, expandMessage);
    };

    var expandMessage = function(index, message){
        if(index == total){
            showResults(true);
        }
        $("#expand-" + index).fadeIn();
        $("#expand-" + index + "-pedido").html(message.pedidos);
        $("#expand-" + index + "-erro").html(message.prettyErroMessage);
    };

    return {
        init: init,
        listarFilaErro: listarFilaErro,
        consoler: consoler,
        jumbotron: jumbotron,
        addFalhaProcessamento: addFalhaProcessamento,
        clearAll: clearAll,
        gpvURL: gpvURL,
        isBackoffice: isBackoffice
    }

}();



$(document).ready(function(){
    GPV.SYSTEM.init();
});
