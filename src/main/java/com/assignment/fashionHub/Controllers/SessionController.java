package com.assignment.fashionHub.Controllers;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "api/")
public class SessionController {

    private static Logger logger = LoggerFactory.getLogger( SessionController.class);
    @GetMapping( path = "persist")
    public List<String> persistMessages(@RequestParam(name = "msg") String message, HttpServletRequest request){

        logger.debug("IN persist message" + message);
        List<String> messages = (List<String>) request.getSession().getAttribute("SESSION_STORE");
        if ( messages == null ){
            messages = new ArrayList<>();
            request.getSession().setAttribute("SESSION_STORE" , messages);
        }
        messages.add(message);
        request.getSession().setAttribute("SESSION_STORE", messages);
        return messages;
    }
}
