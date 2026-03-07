package com.ecoshare.Ecoshare.repository;

import com.ecoshare.Ecoshare.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email); //verifie email deja existant quand on fait l'inscirpiton
                                         //select count(*)>0 from users where email = ?
    Optional<User> findByEmail(String email); // utilise pour login


}
