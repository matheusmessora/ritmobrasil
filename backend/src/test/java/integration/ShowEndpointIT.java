package integration;

import br.com.pandox.ritmobrasil.Main;
import org.apache.http.HttpStatus;
import org.testng.annotations.Test;

import static com.jayway.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

public class ShowEndpointIT {


    public static final int DEFAULT_PORT = 8080;

    @Test
    public void should_return_all_shows() throws Exception {
        Main.main(new String[] {});
        given()
                .port(DEFAULT_PORT)
        .when()
                .get("api/shows")
        .then()
                .statusCode(HttpStatus.SC_OK)
                .body("total", is(1));

    }

}
