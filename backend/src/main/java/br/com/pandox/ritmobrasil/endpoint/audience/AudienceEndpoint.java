package br.com.pandox.ritmobrasil.endpoint.audience;

import br.com.pandox.ritmobrasil.endpoint.message.MessageDTO;
import br.com.pandox.ritmobrasil.service.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class AudienceEndpoint {

    @Autowired
    private AudienceService service;

    @RequestMapping(value = "audience", method = RequestMethod.GET)
    public ResponseEntity<MessageDTO> all() {
        Map<String, List<RadioAudience>> resources = service.findAll();
        return new ResponseEntity(resources, HttpStatus.OK);
    }

}
