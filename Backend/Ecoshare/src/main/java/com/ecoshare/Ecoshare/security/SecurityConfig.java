package com.ecoshare.Ecoshare.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                // Configuration CORS
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Désactivation CSRF (nécessaire pour les API stateless)
                .csrf(csrf -> csrf.disable())
                //  Autoriser les frames pour la console H2
                .headers(headers -> headers.frameOptions(frame -> frame.disable()))
                // Gestion de session Stateless
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //  Autorisations des routes
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll()  // Inscription / Connexion
                        .requestMatchers("/api/auth/me").authenticated()   // Profil courant (JWT requis)
                        .requestMatchers("/api/upload/**").permitAll()      // Upload d'images
                        .requestMatchers("/uploads/**").permitAll()         // Accès aux fichiers images
                        .requestMatchers("/h2-console/**").permitAll()      // Console H2
                        .requestMatchers(HttpMethod.GET, "/api/items/search").permitAll() // Recherche publique
                        .requestMatchers("/api/items/mine").authenticated()               // Mes annonces (JWT)
                        .requestMatchers("/api/users/**").authenticated()                 // Profil (JWT)
                        .requestMatchers(HttpMethod.GET, "/api/items/**").permitAll() // Catalogue public
                        .requestMatchers("/api/messages/**").authenticated() // Messagerie (JWT requis)
                        .anyRequest().authenticated()                       // Sécurise tout le reste
                )
                // Ajout du filtre JWT
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Autorise ton frontend Vite
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5175"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Origin", "Accept"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}