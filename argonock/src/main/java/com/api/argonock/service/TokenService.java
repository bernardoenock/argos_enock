package com.api.argonock.service;

import com.api.argonock.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

  @Value("${api.security.token.secret:default-test-secret}")
  private String secret;

  @PostConstruct
  void validateSecret() {
    if (secret == null || secret.isBlank()) {
      throw new IllegalStateException("Token secret must not be null or blank!");
    }
  }

  public String generateTokenForTest(String email) {
    return generateTokenInternal(email);
  }

  public String generateToken(User user) {
    return generateTokenInternal(user.getEmail());
  }

  private String generateTokenInternal(String subject) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.create()
          .withIssuer("argonock")
          .withSubject(subject)
          .withExpiresAt(this.generateExpirationDate())
          .sign(algorithm);
    } catch (JWTCreationException exception) {
      throw new RuntimeException("Error while generating token", exception);
    }
  }

  public String validateToken(String token) {
    try {
      Algorithm algorithm = Algorithm.HMAC256(secret);
      return JWT.require(algorithm)
          .withIssuer("argonock")
          .build()
          .verify(token)
          .getSubject();
    } catch (JWTVerificationException exception) {
      return null;
    }
  }

  private Instant generateExpirationDate() {
    return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00"));
  }
}
