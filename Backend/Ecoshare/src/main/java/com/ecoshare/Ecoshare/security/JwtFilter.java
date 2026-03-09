package com.ecoshare.Ecoshare.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {


        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {  //sert a ignorer la requete test OPTIONS au cas ou
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }


        String authHeader = request.getHeader("Authorization");   // 2. EXTRACTION DU TOKEN

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            // 3. VALIDATION DU TOKEN
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.extractEmail(token);

                // 4. AUTHENTIFICATION DANS LE CONTEXTE SPRING
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        email, null, new ArrayList<>());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // 5. CONTINUATIONS DE LA CHAÎNE DE FILTRES
        filterChain.doFilter(request, response);
    }
}