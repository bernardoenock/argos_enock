package com.api.argonock.security;

import com.api.argonock.repository.UserRepository;
import com.api.argonock.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Set;

@Component
public class SecurityFilter extends OncePerRequestFilter {

  private final TokenService tokenService;
  private final UserRepository userRepository;

  private static final Set<String> PUBLIC_ENDPOINTS = Set.of(
      "/",
      "/auth/",
      "/auth/login",
      "/auth/register");

  public SecurityFilter(TokenService tokenService, UserRepository userRepository) {
    this.tokenService = tokenService;
    this.userRepository = userRepository;
  }

  @Override
  protected void doFilterInternal(
      @NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response,
      @NonNull FilterChain filterChain) throws ServletException, IOException {

    String path = request.getRequestURI();

    if (PUBLIC_ENDPOINTS.contains(path)) {
      filterChain.doFilter(request, response);
      return;
    }

    String token = recoverToken(request);

    if (token != null) {
      String email = tokenService.validateToken(token);

      if (email != null && !email.isBlank()) {
        UserDetails user = userRepository.findByEmail(email)
            .map(u -> new org.springframework.security.core.userdetails.User(
                u.getEmail(),
                u.getPassword(),
                List.of(() -> "ROLE_" + u.getRole().name())))
            .orElse(null);

        if (user != null) {
          var authentication = new UsernamePasswordAuthenticationToken(
              user,
              null,
              user.getAuthorities());
          SecurityContextHolder.getContext().setAuthentication(authentication);
        }
      }
    }

    filterChain.doFilter(request, response);
  }

  private String recoverToken(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return null;
    }
    return authHeader.replace("Bearer ", "");
  }
}
