package com.assignment.fashionHub.Services;

import com.assignment.fashionHub.Models.AppUserRole;
import com.assignment.fashionHub.Models.ApplicationUser;
import com.assignment.fashionHub.Models.RegistrationRequest;
import com.assignment.fashionHub.auth.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final AppUserService appUserService;


    public String register(RegistrationRequest request){
        ApplicationUser.Gender gender = ApplicationUser.Gender.MALE;
        if ( request.getGender().toUpperCase(Locale.ROOT).equals("MALE")){
            gender = ApplicationUser.Gender.MALE;
        }
        else if ( request.getGender().toUpperCase(Locale.ROOT).equals("FEMALE")){
            gender = ApplicationUser.Gender.FEMALE;
        }
        else{
            throw new IllegalStateException("GENDER SHOULD BE ONE OF MALE/FEMALE. There are only two genders!!");
        }
        AppUserRole appUserRole=AppUserRole.USER;
        if(request.getRole().toUpperCase(Locale.ROOT).equals("ADMIN")){
            appUserRole=AppUserRole.ADMIN;
        }

        return appUserService.signupUser( new ApplicationUser(
                request.getFirstName(),
                request.getLastName(),
                request.getUserName(),
                request.getPassword(),
                request.getEmail(),
                appUserRole,
                gender
        ));


    }



}
