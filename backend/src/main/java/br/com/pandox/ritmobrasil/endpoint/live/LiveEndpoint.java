package br.com.pandox.ritmobrasil.endpoint.live;

import br.com.pandox.ritmobrasil.endpoint.message.MessageDTO;
import br.com.pandox.ritmobrasil.service.live.LiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LiveEndpoint {

    @Autowired
    private LiveService service;


    @RequestMapping(value = "live", method = RequestMethod.GET)
    public ResponseEntity<LiveDTO> findAll() {
        LiveDTO liveDTO = service.get();
        return new ResponseEntity(liveDTO, HttpStatus.OK);
    }

    @RequestMapping(value = "live/{id}", method = RequestMethod.PUT)
    public ResponseEntity<MessageDTO> save(@PathVariable("id") Integer id) {
        service.save(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Autowired
    private Facebook facebook;

    @Autowired
    private ConnectionRepository connectionRepository;


//    @RequestMapping(method=RequestMethod.GET)
//    public String helloFacebook(Model model) {
//        if (connectionRepository.findPrimaryConnection(Facebook.class) == null) {
//            return "redirect:/connect/facebook";
//        }
//
//        model.addAttribute("facebookProfile", facebook.userOperations().getUserProfile());
//        PagedList<Post> feed = facebook.feedOperations().getFeed();
//        model.addAttribute("feed", feed);
//        return "hello";
//    }


}
