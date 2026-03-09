package com.ecoshare.Ecoshare.service;

import com.ecoshare.Ecoshare.model.User;
import com.ecoshare.Ecoshare.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // L'injection des dépendances se fait via le constructeur
    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {               //enregistre l'utilisateur dans la bdd avec un mdp crypté

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }
    public boolean authenticate(String email, String rawPassword) {     //cherche un utilisateur par mail puis regarde si le mdp crypte match

        Optional<User> userOptional = userRepository.findByEmail(email);


        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }


        return false;       //return false si ne trouve pas de mail
    }


}