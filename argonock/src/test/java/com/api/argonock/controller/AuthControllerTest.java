package com.api.argonock.controller;

import com.api.argonock.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Test
    @DisplayName("Deve registrar um novo usuário com sucesso")
    void shouldRegisterUserSuccessfully() throws Exception {
        String requestBody = """
                {
                    "email": "testuser@example.com",
                    "password": "password123",
                    "role": "USER"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());

        var user = userRepository.findByEmail("testuser@example.com");
        assert user != null;
        assert user.getUsername().equals("testuser@example.com");
        assert user.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals("ROLE_USER"));
    }

    @Test
    @DisplayName("Deve retornar erro ao tentar registrar usuário com email duplicado")
    void shouldReturnErrorOnDuplicateEmail() throws Exception {
        String initialRequestBody = """
                {
                    "email": "duplicate@example.com",
                    "password": "password123",
                    "role": "USER"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(initialRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());

        String duplicateRequestBody = """
                {
                    "email": "duplicate@example.com",
                    "password": "anotherpassword",
                    "role": "USER"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(duplicateRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    @DisplayName("Deve realizar login com credenciais válidas e retornar um token")
    void shouldLoginWithValidCredentialsAndReturnToken() throws Exception {
        String registerRequestBody = """
                {
                    "email": "loginuser@example.com",
                    "password": "securepassword",
                    "role": "USER"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());

        String loginRequestBody = """
                {
                    "email": "loginuser@example.com",
                    "password": "securepassword"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.token").isNotEmpty());
    }

    @Test
    @DisplayName("Deve retornar erro ao tentar login com credenciais inválidas")
    void shouldReturnErrorOnInvalidCredentials() throws Exception {
        String invalidEmailRequestBody = """
                {
                    "email": "wronguser@example.com",
                    "password": "password123"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidEmailRequestBody))
                .andExpect(MockMvcResultMatchers.status().isForbidden());

        String invalidPasswordRequestBody = """
                {
                    "email": "testuser@example.com",
                    "password": "wrongpassword"
                }
                """;

        String registerRequestBody = """
                {
                    "email": "testuser@example.com",
                    "password": "password123",
                    "role": "USER"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.post("/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidPasswordRequestBody))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }

    @Test
    @DisplayName("Deve retornar 403 Forbidden ao acessar endpoint protegido sem token")
    void shouldReturnForbiddenWithoutToken() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }

    @Test
    @DisplayName("Deve retornar 401 Unauthorized com token inválido")
    void shouldReturnUnauthorizedWithInvalidToken() throws Exception {
        String invalidToken = "invalid.jwt.token";

        mockMvc.perform(MockMvcRequestBuilders.get("/users")
                .header("Authorization", "Bearer " + invalidToken)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isForbidden());
    }

    @Test
    @DisplayName("Deve retornar 200 OK ao acessar endpoint protegido com token válido")
    void shouldAccessProtectedEndpointWithValidToken() throws Exception {
        String registerRequestBody = """
                {
                    "email": "protecteduser@example.com",
                    "password": "validpassword",
                    "role": "USER"
                }
                """;
        mockMvc.perform(MockMvcRequestBuilders.post("/auth/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(registerRequestBody))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}