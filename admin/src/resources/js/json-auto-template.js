var PANDOX = PANDOX || {};

/*=====================================================================================================
 * TEMPLATE Module - POC
 *======================================================================================================*/
PANDOX.TEMPLATE = function () {

    var render = function (templateID, json) {
        var keys = Object.keys(json);
        
        console.debug("TEMPLATER.templateID", templateID);
        console.debug("TEMPLATER.render", json);
        console.debug("TEMPLATER.KEYS", keys);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = json[key];
            var element = $("#" + key);

            if(element.attr("templater-format") === "data"){
                value = moment(value).format("dddd, DD/MM/YYYY, HH:mm:ss");
            }

            element.html(value);
            // console.debug("TEMPLATER.JSON.VALUE key="+key, json[key]);
        }

        $("#" + templateID).show();
    };

    var replacer = function(html, json) {
        var formattedHTML = html;
        var keys = Object.keys(json);
        // console.debug("TEMPLATER.replacer.html", html);
        // console.debug("TEMPLATER.replacer", json);
        // console.debug("TEMPLATER.KEYS", keys);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = json[key];

            formattedHTML = formattedHTML.replace(new RegExp("{{"+key+"}}", 'g'), value);
        }

        return formattedHTML;
    };

    return {
        render: render,
        replacer: replacer
    }

}();