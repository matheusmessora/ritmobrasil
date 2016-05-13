package br.com.pandox.ritmobrasil.endpoint.message;


import java.time.LocalDateTime;

public class MessageDTO {

    private Long id;

    private LocalDateTime date;

    private String message;

    private String name;

    private String token;

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(final LocalDateTime date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(final String token) {
        this.token = token;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    public boolean equals(final Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        final MessageDTO that = (MessageDTO) o;

        return id != null ? id.equals(that.id) : that.id == null;

    }

    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
