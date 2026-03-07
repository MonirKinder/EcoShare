package com.ecoshare.Ecoshare.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // On utilise une chaîne de caractères d'au moins 32 caractères pour être sécurisée (256 bits)
    private final String SECRET = "MaCleSecreteSuperSecuriseeEcoshare2026Backend123456789";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Le jeton sera valide pendant 24 heures (en millisecondes)
    private final long EXPIRATION_TIME = 86400000;

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }
    // Extrait l'email caché à l'intérieur du jeton
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Vérifie que le jeton n'est pas expiré et n'a pas été falsifié
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}