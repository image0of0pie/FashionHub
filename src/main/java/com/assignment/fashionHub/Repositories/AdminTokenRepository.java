package com.assignment.fashionHub.Repositories;

import com.assignment.fashionHub.Models.AdminRegisterToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface AdminTokenRepository extends JpaRepository<AdminRegisterToken,Long> {

    @Override
    Optional<AdminRegisterToken> findById(Long aLong);
}
