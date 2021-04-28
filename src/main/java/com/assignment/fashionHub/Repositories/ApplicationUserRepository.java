package com.assignment.fashionHub.Repositories;

import com.assignment.fashionHub.Models.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface ApplicationUserRepository extends JpaRepository<ApplicationUser, Long> {

    Optional<ApplicationUser> findApplicationUsersByEmail(String email);

}
