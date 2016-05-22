package br.com.pandox.ritmobrasil.service.live;

import br.com.pandox.ritmobrasil.endpoint.live.LiveDTO;

public class ForaDeHora extends LiveDTO {

    public ForaDeHora(String hoster) {
        super(true, "Fora de hora", hoster);
    }
}
