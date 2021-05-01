package com.assignment.fashionHub.Models;


import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "admintoken")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString

public class AdminRegisterToken {
    @Id
    private Long id;
    private String token;
    private String time;

    public String getToken() {
        return token;
    }
}
