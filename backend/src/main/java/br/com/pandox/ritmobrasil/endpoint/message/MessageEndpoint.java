package br.com.pandox.ritmobrasil.endpoint.message;

import br.com.pandox.ritmobrasil.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MessageEndpoint {

    @Autowired
    private MessageService service;

    @RequestMapping(value = "message", method = RequestMethod.POST)
    public ResponseEntity<MessageDTO> save(MessageDTO dto) {
        MessageDTO saved = service.save(dto);
        return new ResponseEntity(saved, HttpStatus.CREATED);
    }

    @RequestMapping(value = "message/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<MessageDTO> delete(@PathVariable("id") Long id) {
        service.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "message", method = RequestMethod.GET)
    public ResponseEntity<MessageDTO> all() {
        List<MessageDTO> resources = service.findAll();
        return new ResponseEntity(resources, HttpStatus.OK);
    }

}
