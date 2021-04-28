package com.assignment.fashionHub.auth;

import com.assignment.fashionHub.Models.ApplicationUser;
import com.assignment.fashionHub.Repositories.ApplicationUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService implements UserDetailsService {


    private final static String USER_NOT_FOUND_MSG =
            "user with email %s not found";

    private final ApplicationUserRepository applicationUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public AppUserService(ApplicationUserRepository applicationUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.applicationUserRepository = applicationUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return applicationUserRepository.findApplicationUsersByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email)));

    }




    public String signupUser( ApplicationUser applicationUser){
        boolean userExists = applicationUserRepository
                .findApplicationUsersByEmail(applicationUser.getUsername())
                .isPresent();

        if ( userExists ){
            throw  new IllegalStateException("email already used, try logging in");
        }

        String encodedPassword = bCryptPasswordEncoder.encode(applicationUser.getPassword());
        applicationUser.setPassword(encodedPassword);

        System.out.println("IN appUserService" + applicationUser);
        applicationUserRepository.save(applicationUser);
        return "SUCCESS";
    }



}
