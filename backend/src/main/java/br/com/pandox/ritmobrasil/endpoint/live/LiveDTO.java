package br.com.pandox.ritmobrasil.endpoint.live;

public class LiveDTO {

    private Integer id;
    private boolean live;
    private String showName;
    private String hoster;

    public LiveDTO() {
    }

    public LiveDTO(final boolean live, final String showName, final String hoster) {
        this.live = live;
        this.showName = showName;
        this.hoster = hoster;
    }

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public boolean isLive() {
        return live;
    }

    public void setLive(final boolean live) {
        this.live = live;
    }

    public String getShowName() {
        return showName;
    }

    public void setShowName(final String showName) {
        this.showName = showName;
    }

    public String getHoster() {
        return hoster;
    }

    public void setHoster(final String hoster) {
        this.hoster = hoster;
    }
}
