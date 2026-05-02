package com.ecoshare.Ecoshare.controller;

import com.ecoshare.Ecoshare.model.User;
import com.ecoshare.Ecoshare.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * PUT /api/users/me
     * Update name, location, and optionally password
     * Body: { name, location, currentPassword?, newPassword? }
     */
    @PutMapping("/me")
    public ResponseEntity<?> updateMe(Authentication auth, @RequestBody Map<String, String> body) {
        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        if (body.containsKey("name") && !body.get("name").isBlank()) {
            user.setName(body.get("name"));
        }
        if (body.containsKey("location")) {
            user.setLocation(body.get("location"));
        }

        // Password change: requires currentPassword + newPassword
        String currentPw = body.get("currentPassword");
        String newPw = body.get("newPassword");
        if (currentPw != null && newPw != null && !newPw.isBlank()) {
            if (!passwordEncoder.matches(currentPw, user.getPassword())) {
                return ResponseEntity.badRequest().body("Mot de passe actuel incorrect.");
            }
            user.setPassword(passwordEncoder.encode(newPw));
        }

        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "userId", user.getId(),
                "name", user.getName() != null ? user.getName() : "",
                "email", user.getEmail(),
                "location", user.getLocation() != null ? user.getLocation() : ""
        ));
    }
}
