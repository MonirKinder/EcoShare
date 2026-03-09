package com.ecoshare.Ecoshare.controller;

import com.ecoshare.Ecoshare.model.User;
import com.ecoshare.Ecoshare.service.AuthService;
import com.ecoshare.Ecoshare.repository.UserRepository;
import com.ecoshare.Ecoshare.dto.LoginRequest;
import com.ecoshare.Ecoshare.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(AuthService authService, UserRepository userRepository, JwtUtil jwtUtil) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Erreur : Cet email est déjà utilisé.");
        }


        User savedUser = authService.registerUser(user);
        return ResponseEntity.ok(savedUser);      //
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {  // il va recuperer login request

        boolean isAuthenticated = authService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());

        if (isAuthenticated) {  // si la mdp et mail sont corrects

            String token = jwtUtil.generateToken(loginRequest.getEmail());  //genere token


            Map<String, String> response = new HashMap<>();    //cree dictionaire pour le format JSON {"token" : token}
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Erreur : Email ou mot de passe incorrect.");
        }
    }
}
