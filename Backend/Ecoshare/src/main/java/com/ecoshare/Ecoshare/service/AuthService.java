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

    public User registerUser(User user) {
        // 1. On crypte le mot de passe brut
        String hashedPassword = passwordEncoder.encode(user.getPassword());

        // 2. On remplace le mot de passe brut par la version cryptée
        user.setPassword(hashedPassword);

        // 3. On sauvegarde l'utilisateur en base de données
        return userRepository.save(user);
    }
    public boolean authenticate(String email, String rawPassword) {
        // 1. On cherche l'utilisateur par son email
        Optional<User> userOptional = userRepository.findByEmail(email);

        // 2. S'il existe, on compare les mots de passe
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(rawPassword, user.getPassword());
        }

        // 3. S'il n'existe pas, la connexion échoue
        return false;
    }


}