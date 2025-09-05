package com.api.argonock.controller;

import com.api.argonock.model.User;
import com.api.argonock.model.UserRole;
import com.api.argonock.service.TokenService;
import com.api.argonock.service.AuthorizationService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final AuthenticationManager authenticationManager;
  private final TokenService tokenService;
  private final AuthorizationService authorizationService;

  public AuthController(AuthenticationManager authenticationManager, TokenService tokenService,
      AuthorizationService authorizationService) {
    this.authenticationManager = authenticationManager;
    this.tokenService = tokenService;
    this.authorizationService = authorizationService;
  }

  public record LoginRequest(String email, String password) {
  }

  public record RegisterRequest(String email, String password, UserRole role) {
  }

  public record AuthenticationResponse(String token) {
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> login(@RequestBody @Valid LoginRequest loginRequest) {
    var usernamePassword = new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password());
    var authentication = this.authenticationManager.authenticate(usernamePassword);
    var user = (User) authentication.getPrincipal();
    var token = tokenService.generateToken(user);
    return ResponseEntity.ok(new AuthenticationResponse(token));
  }

  @PostMapping("/register")
  public ResponseEntity<Void> register(@RequestBody @Valid RegisterRequest registerRequest) {
    authorizationService.saveUser(registerRequest.email(), registerRequest.password(), registerRequest.role());
    return ResponseEntity.ok().build();
  }
}
