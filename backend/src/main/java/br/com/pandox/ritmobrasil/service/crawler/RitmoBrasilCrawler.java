package br.com.pandox.ritmobrasil.service.crawler;

import br.com.pandox.ritmobrasil.endpoint.audience.RadioAudience;
import br.com.pandox.ritmobrasil.service.AudienceService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class RitmoBrasilCrawler {

    @Autowired
    private AudienceService service;


    @Scheduled(fixedDelay=5000)
    public void loadRitmoBrasilAudience() throws IOException {


        Integer audience = 0;
        try {
            audience = getAudience();
        } catch (Exception e) {
//            e.printStackTrace();
        }


        System.out.println("ritmobrasil = " + audience);
        service.register("ritmobrasil", new RadioAudience(audience));
    }

    private Integer getAudience() throws IOException {
        Connection con = Jsoup.connect("http://shoutcast.umhost.com.br:2006/");
        con.ignoreHttpErrors(true).followRedirects(true);
        con.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 " +
                "Safari/535.21");
        Document doc = con.get();
        Elements b = doc.getElementsByTag("b");
        Element element = b.get(2);
        String html = element.html();
        return Integer.valueOf(html.split(" ")[0]);
    }

}
