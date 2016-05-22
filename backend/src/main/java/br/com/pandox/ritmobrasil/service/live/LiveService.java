package br.com.pandox.ritmobrasil.service.live;

import br.com.pandox.ritmobrasil.endpoint.live.LiveDTO;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Service
public class LiveService {

    private LiveDTO live;

    private Map<Integer, LiveDTO> data;

    @PostConstruct
    public void init(){
        live = new AutoDjLive();
        live.setId(1);
        data = new HashMap<>();
        data.put(1, new AutoDjLive());
        data.put(2, new ForaDeHora("Snake"));
        data.put(3, new ForaDeHora("Carlos Nunes"));
    }

    public void save(final Integer id) {
        live = data.get(id);
        live.setId(id);
    }

    public LiveDTO get(){
        return live;
    }
}
