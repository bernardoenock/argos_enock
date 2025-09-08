package com.api.argonock.service;

import com.api.argonock.dto.UserRequestDTO;
import com.api.argonock.model.User;
import com.api.argonock.model.UserRole;
import com.api.argonock.repository.UserRepository;
import com.api.argonock.exception.EmailAlreadyExistsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public List<User> findAllUsers() {
    return userRepository.findAll();
  }

  public Optional<User> findUserById(String id) {
    return userRepository.findById(id);
  }

  @Transactional
  public User createUser(UserRequestDTO requestDTO) {
    if (userRepository.findByEmail(requestDTO.getEmail()) != null) {
      throw new EmailAlreadyExistsException("Email já está em uso: " + requestDTO.getEmail());
    }

    User newUser = new User();

    newUser.setName(requestDTO.getName());
    newUser.setUsername(requestDTO.getUsername());
    newUser.setEmail(requestDTO.getEmail());
    newUser.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
    newUser.setPhone(requestDTO.getPhone());
    newUser.setWebsite(requestDTO.getWebsite());
    newUser.setAddress(requestDTO.getAddress());
    newUser.setCompany(requestDTO.getCompany());
    newUser.setRole(UserRole.USER);

    return userRepository.save(newUser);
  }

  @Transactional
  public Optional<User> updateUser(String id, UserRequestDTO requestDTO) {
    return userRepository.findById(id).map(existingUser -> {
      if (requestDTO.getName() != null)
        existingUser.setName(requestDTO.getName());
      if (requestDTO.getUsername() != null)
        existingUser.setUsername(requestDTO.getUsername());
      if (requestDTO.getEmail() != null)
        existingUser.setEmail(requestDTO.getEmail());
      if (requestDTO.getPhone() != null)
        existingUser.setPhone(requestDTO.getPhone());
      if (requestDTO.getWebsite() != null)
        existingUser.setWebsite(requestDTO.getWebsite());
      if (requestDTO.getAddress() != null)
        existingUser.setAddress(requestDTO.getAddress());
      if (requestDTO.getCompany() != null)
        existingUser.setCompany(requestDTO.getCompany());

      if (requestDTO.getPassword() != null && !requestDTO.getPassword().isEmpty()) {
        existingUser.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
      }

      return userRepository.save(existingUser);
    });
  }

  @Transactional
  public boolean deleteUser(String id) {
    if (userRepository.existsById(id)) {
      userRepository.deleteById(id);
      return true;
    }
    return false;
  }
}