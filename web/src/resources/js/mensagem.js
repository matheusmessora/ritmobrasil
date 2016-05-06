var GPV = GPV || {};

/*=====================================================================================================
 * SYSTEM Module
 *======================================================================================================*/
GPV.MENSAGEM = function () {

    var loadedMessage;

    var init = function () {
        console.debug("GPV.MENSAGEM INIT");
    };

    var getLoadedMessage = function(){
        return loadedMessage;
    };

    var loadMessage = function(index, messageID, callback){
        var mensagem = {};
        $.get("http://" + GPV.SYSTEM.gpvURL() + "/gpv-webservices/resources/filaErro/listarPorMessageID/" + messageID, function (message) {

            var pedidos = "";
            if(message.filaOrigem === 'SystemModule-GPV!GPV.INTEGRACAO_PEDIDO_ATG_ABACOS.CADASTRA_PEDIDO'){
                pedidos = JSON.parse(message.json).pedido.numeroPedido;
            } else if(message.filaOrigem === '/gpv/atg/new/ordersprofiles' || message.filaOrigem === 'GPV.INTEGRACAO_PEDIDO_ATG_ABACOS.PROCESSA_REQUEST_MESSAGE'){
                var entityInfos = JSON.parse(message.json).entityInfos;
                $.each(entityInfos, function(i, entity) {
                    var cpfCnpj = entity.profileInfo.cpfCnpj;
                    message.correlationID = cpfCnpj;
                    $("#correlationID").html(cpfCnpj + ' <a href="/pedido.html?id=' + cpfCnpj + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span><a/>');
                    $.each(entity.orderInfo, function(i, order){
                        pedidos += order.numeroPedido  + ' <a href="/pedido?id=' + order.numeroPedido + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>' + ", ";
                    });
                });

                //pedidos = .numeroPedido + '<a href="/pedido.html?id=' + JSON.parse(message.json).pedido.numeroPedido + '"><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button></a>';
            } else {
                var orderInfo = JSON.parse(message.json).orderInfo;
                if(orderInfo === undefined || orderInfo.length == 0){
                    pedidos = '<span style="color:red" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>';
                }else {
                    pedidos = "";
                    $.each(orderInfo, function(i, pedido) {
                        pedidos += pedido.numeroPedido  + ' <a href="/pedido?id=' + pedido.numeroPedido + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>' + ", ";
                    });
                }
            }
            message.pedidos = pedidos;
            mensagem = message;

            mensagem.prettyErroMessage = prettifyAbacos(mensagem.mensagemErro);
            callback(index, mensagem);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            GPV.SYSTEM.consoler("Falha ao buscar mensagem. " +jqXHR.status+ " - " + jqXHR.statusText);
        });
        return mensagem;
    };

    var prettifyAbacos = function(message){
        if(message === undefined || message.length == 0){
            return message;
        }

        // Tratamento da imagem do bud
        var abacosBuggyError = "<title>500</title>";
        var encontrado = message.indexOf(abacosBuggyError) > -1;
        if(encontrado){
            return "ABACOS: 500 - InternalServerError - Something went horribly, horribly wrong while servicing your request.";
        }

        // Tratamento de Request Error
        var abacosMalformedError = "The exception stack trace is";
        encontrado = message.indexOf(abacosMalformedError) > -1;
        if(encontrado){
            message = message.split(abacosMalformedError)[1];
            message = message.replace(/<(?:.|\n)*?>/gm, '');
            return message;
        }

        return message.substring(0,10000);
    };

    var prettifyPedidos = function(message){
        if(message.filaOrigem === 'SystemModule-GPV!GPV.INTEGRACAO_PEDIDO_ATG_ABACOS.CADASTRA_PEDIDO'){
            return JSON.parse(message.json).pedido.numeroPedido + '<a href="/pedido.html?id=' + JSON.parse(message.json).pedido.numeroPedido + '"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>';
        }

        if(message.filaOrigem === '/gpv/atg/new/ordersprofiles' || message.filaOrigem === 'GPV.INTEGRACAO_PEDIDO_ATG_ABACOS.PROCESSA_REQUEST_MESSAGE'){
            var pedidos = "";
            var entityInfos = JSON.parse(message.json).entityInfos;
            $.each(entityInfos, function(i, entity) {
                var cpfCnpj = entity.profileInfo.cpfCnpj;
                $("#correlationID").html(cpfCnpj + ' <a href="/pedido.html?id=' + cpfCnpj + '"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span><a/>');
                $.each(entity.orderInfo, function(i, order){
                    pedidos += order.numeroPedido  + ' <a href="/pedido?id=' + order.numeroPedido + '"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>' + ", ";
                });
            });
            return pedidos;
        }

        if(message.filaOrigem === 'SystemModule-GPV!GPV.INTEGRACAO_PEDIDO_ATG_ABACOS.CONTINGENCIA_PEDIDO'){
            var pedidos = JSON.parse(message.json).numeroPedido;
            return pedidos + '<a href="/pedido?id=' + pedidos + '"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>' + ", ";
        }

        var orderInfo = JSON.parse(message.json).orderInfo;
        var pedidos = "";
        if(orderInfo === undefined || orderInfo.length == 0){
            pedidos = '<span style="color:red" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>';
        }else {
            pedidos = "";
            $.each(orderInfo, function(i, pedido) {
                pedidos += pedido.numeroPedido  + ' <a href="/pedido?id=' + pedido.numeroPedido + '"> <span class="glyphicon glyphicon-search" aria-hidden="true"></span></a>' + ", ";
            });
        }

        return pedidos;
    };

    var printMessage = function(){
        bindButtonSave();
        bindButtonSend();
        var messageID = GPV.UTIL.uriParam("id");

        $.get("http://" + GPV.SYSTEM.gpvURL() + "/gpv-webservices/resources/filaErro/listarPorMessageID/" + messageID, function (message) {
            $("#messageID").html(message.messageID);
            $("#data").html(message.data);
            $("#correlationID").html(message.correlationID + ' <a href="/pedido.html?id=' + message.correlationID + '"><span class="glyphicon glyphicon-search" aria-hidden="true"></span><a/>');
            $("#mensagemErro").html(prettifyAbacos(message.mensagemErro));
            $("#mensagemErroDetalhada").html(prettifyAbacos(message.mensagemErroDetalhada));

            if(GPV.SYSTEM.isBackoffice()){
                $("#json").val(message.json).show();
                $("#disponivelReenvio").html((message.disponivelReenvio) ? '<span style="color:green"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Disponivel para reenvio</span>' : '<span style="color:red"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Indisponivel para reenvio</span>');
            }else {
                $("#jsonText").html(message.json).show();
            }

            $("#filaOrigem").html(message.filaOrigem);

            var pedidos = prettifyPedidos(message);
            $("#pedidos").html('' + pedidos);


            loadedMessage = message;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            GPV.SYSTEM.consoler("Falha ao buscar mensagem. " +jqXHR.status+ " - " + jqXHR.statusText);
        });

        bindButtonExpand();
        bindButtonClose();
    };

    var erro = function(msg){
        $("#errors").html('<strong>ERRO: </strong>' + msg).show().delay(5000).fadeOut();
    };

    var isJsonValid = function(stringJson){
        try {
            JSON.parse(stringJson);
        } catch (e) {
            return false;
        }
        return true;
    };

    var save = function(){
        var stringJson = $("#json").val();
        if(isJsonValid(stringJson)){
            getLoadedMessage().json = stringJson;
            $.ajax({
                url: 'http://' + GPV.SYSTEM.gpvURL() + '//gpv-webservices/resources/filaErro/salvar',
                type: 'PUT',
                data: JSON.stringify(getLoadedMessage()),
                contentType: "application/json",
                success: function(result) {
                    GPV.SYSTEM.jumbotron("Mensagem salva com sucesso!");
                },
                fail: function(jqXHR, textStatus, errorThrown) {
                    GPV.SYSTEM.consoler("Falha ao salvar Mensagem. " +jqXHR.status+ " - " + jqXHR.statusText);
                }
            });
        }else {
            erro("JSON inválido.");
        }
    };

    var send = function(){
        var messageID = getLoadedMessage().messageID;

        $.ajax({
            url: 'http://' + GPV.SYSTEM.gpvURL() + '//gpv-webservices/resources/filaErro/reenviarPorMessageID',
            type: 'PUT',
            data: messageID,
            contentType: "text/plain",
            success: function(result) {
                GPV.SYSTEM.jumbotron("Mensagem reenviada!");
            },
            fail: function(jqXHR, textStatus, errorThrown) {
                GPV.SYSTEM.consoler("Falha ao reenviar mensagem. " +jqXHR.status+ " - " + jqXHR.statusText);
            }
        });
    };
    
    var bindButtonSave = function () {
        if(GPV.SYSTEM.isBackoffice()){
            $("#save").click(function (event) {
                event.preventDefault();
                save();

            });
        }else {
            $("#save").hide();
        }
    };
    var bindButtonSend = function () {
        if(GPV.SYSTEM.isBackoffice()) {
            $("#send").click(function (event) {
                event.preventDefault();
                send();

            });
        }else {
            $("#send").hide();
        }
    };

    var bindButtonExpand = function(){
        $("#expand").click(function (event) {
            event.preventDefault();
            expandDetailErro(true);
        });
    };
    var bindButtonClose = function(){
        $("#close").click(function (event) {
            event.preventDefault();
            expandDetailErro(false);
        });
    };

    var expandDetailErro = function(expand){
        if(expand){
            $("#mensagemErroDetalhada").fadeIn();
            $("#expand").hide();
            $("#close").show();
        }else {
            $("#mensagemErroDetalhada").fadeOut();
            $("#expand").show();
            $("#close").hide();
        }

    };


    var listarFilaErro = function () {
        $.get("http://' + GPV.SYSTEM.gpvURL() + '/gpv-webservices/resources/filaErro/listarFilaErro", function (filaErro) {

            if(filaErro.listaFalhaProcessamento.length == 0){
                jumbotron('<span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Fila vazia!');
            }

            $.each(filaErro.listaFalhaProcessamento, function (i, falha) {
                var correlationID = falha.correlationID;
                if(correlationID === undefined){
                    correlationID = '<span style="color:red" class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> null'
                }

                $("#listarFilaErroTable").append('<tr><th scope="row">' + correlationID + '</th><td>' + falha.data + '</td><td>' + falha.filaOrigem + '</td>'
                    + '<td><a href="/message.html?id=' + falha.messageID + '"><button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button></a></td></tr>'
                    );
            });
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            GPV.SYSTEM.consoler("Falha ao buscar listarFilaErro. " +jqXHR.status+ " - " + jqXHR.statusText);
        })
    };

    return {
        init: init,
        listarFilaErro: listarFilaErro,
        printMessage: printMessage,
        loadMessage: loadMessage,
        getLoadedMessage: getLoadedMessage
    }

}();



$(document).ready(function(){
    GPV.MENSAGEM.init();
});
