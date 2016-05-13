package br.com.pandox.ritmobrasil.service;

import br.com.pandox.ritmobrasil.endpoint.audience.RadioAudience;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AudienceService {

    private Map<String, List<RadioAudience>> radios;

    @PostConstruct
    public void init(){
        radios = new HashMap<>();
    }

    public Map<String, List<RadioAudience>> findAll(){
        return radios;
    }


    public void register(String radio, RadioAudience radioAudience){
        List<RadioAudience> audiences = radios.get(radio);
        if (audiences == null) {
            radios.put(radio, Lists.newArrayList(radioAudience));
        }else {
//            audiences.add(radioAudience);
            radios.put(radio, Lists.newArrayList(radioAudience));
        }
    }
}
