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
    private final String SECRET = "BlaBlaEcoshareSecretToken123HeheHAHA123321456";
    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());


    private final long EXPIRATION_TIME = 86400000;  // Le jeton sera valide pendant 24 heures (en millisecondes)

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)                              //stocke mail a l'interieur
                .setIssuedAt(new Date())                        //date de naissance token
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))  //fin de validité
                .signWith(key)     //sceau
                .compact();
    }

    public String extractEmail(String token) {    // Extrait l'email caché à l'intérieur du jeton
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)     //verifie validite de token puis separe en  header, body, signature
                .getBody()
                .getSubject();    //recupere mail
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