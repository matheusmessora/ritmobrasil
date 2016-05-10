package br.com.pandox.ritmobrasil.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.social.connect.ConnectionRepository;
import org.springframework.social.facebook.api.Facebook;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LiveEndpoint {

    @RequestMapping(value = "live", method = RequestMethod.GET)
    public ResponseEntity<LiveDTO> findAll() {
        LiveDTO liveDTO = new LiveDTO(true, "SOM DA RITMO", "DJ Snake");
        return new ResponseEntity(liveDTO, HttpStatus.OK);
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
