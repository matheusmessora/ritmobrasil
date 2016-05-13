package br.com.pandox.ritmobrasil.endpoint.audience;

import java.util.List;

public class AudienceDTO {

    private List<RadioAudience> ritmoBrasil;

    public List<RadioAudience> getRitmoBrasil() {
        return ritmoBrasil;
    }

    public void setRitmoBrasil(final List<RadioAudience> ritmoBrasil) {
        this.ritmoBrasil = ritmoBrasil;
    }
}
