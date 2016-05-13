package br.com.pandox.ritmobrasil.service;

import br.com.pandox.ritmobrasil.endpoint.message.MessageDTO;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    private List<MessageDTO> messages;

    @PostConstruct
    public void init(){
        messages = new ArrayList<MessageDTO>();
    }

    public MessageDTO save(MessageDTO messageDTO){
        messageDTO.setDate(LocalDateTime.now());
        messageDTO.setId(Long.valueOf(messages.size()));
        this.messages.add(messageDTO);

        return messageDTO;
    }

    public void delete(Long id){
        MessageDTO dto = messages.stream()
                .filter(messageDTO -> messageDTO.getId().equals(id))
                .findFirst()
                .orElse(new MessageDTO());
        messages.remove(dto);
    }

    public List<MessageDTO> findAll() {
        return messages;
    }
}
