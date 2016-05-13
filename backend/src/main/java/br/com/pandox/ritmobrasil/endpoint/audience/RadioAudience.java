package br.com.pandox.ritmobrasil.endpoint.audience;

import java.time.LocalDateTime;

public class RadioAudience {

    private LocalDateTime time;
    private Integer listeners;

    public RadioAudience(final Integer listeners) {
        this.time = LocalDateTime.now();
        this.listeners = listeners;
    }

    public RadioAudience() {
    }

    public LocalDateTime getTime() {
        return time;
    }

    public void setTime(final LocalDateTime time) {
        this.time = time;
    }

    public Integer getListeners() {
        return listeners;
    }

    public void setListeners(final Integer listeners) {
        this.listeners = listeners;
    }
}
