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
public class SoundpopCrawler {

    @Autowired
    private AudienceService service;


    @Scheduled(fixedDelay=5000)
    public void loadRitmoBrasilAudience() throws IOException {

        Integer audience = Integer.valueOf(getAudienceFrom64Kbps());
        Integer total = audience + Integer.valueOf(getAudienceFrom128Kbps());


        System.out.println("soundPop=" + total);
        service.register("soundpop", new RadioAudience(total));
    }

    private String getAudienceFrom64Kbps() throws IOException {
        Connection con = Jsoup.connect("http://172.82.128.10:19342/index.html?sid=1");
        con.ignoreHttpErrors(true).followRedirects(true);
        con.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 " +
                "Safari/535.21");
        Document doc = con.get();
        Elements b = doc.getElementsByTag("b");
        Element element = b.get(1);
        String html = element.html();
        return html.split(" ")[7];
    }
    private String getAudienceFrom128Kbps() throws IOException {
        Connection con = Jsoup.connect("http://172.82.128.10:19342/index.html?sid=4");
        con.ignoreHttpErrors(true).followRedirects(true);
        con.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 " +
                "Safari/535.21");
        Document doc = con.get();
        Elements b = doc.getElementsByTag("b");
        Element element = b.get(1);
        String html = element.html();
        return html.split(" ")[7];
    }

}
