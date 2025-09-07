package com.api.argonock.exception;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * GlobalExceptionHandler é um manipulador de exceções centralizado para a
 * aplicação.
 * Ele usa a anotação @ControllerAdvice para capturar exceções de todos os
 * controladores
 * e fornecer respostas HTTP adequadas (por exemplo, 404, 400, etc.).
 */
@ControllerAdvice
public class GlobalExceptionHandler {

  /**
   * Manipula EntityNotFoundException e retorna uma resposta HTTP 404 Not Found.
   * Esta exceção é comumente lançada por serviços quando uma entidade com o ID
   * fornecido não é encontrada.
   *
   * @param ex      A exceção EntityNotFoundException.
   * @param request A requisição web atual.
   * @return Um ResponseEntity com status 404 e um corpo de erro detalhado.
   */
  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<Object> handleEntityNotFoundException(EntityNotFoundException ex, WebRequest request) {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("status", HttpStatus.NOT_FOUND.value());
    body.put("error", "Not Found");
    body.put("message", ex.getMessage());
    body.put("path", request.getDescription(false).replace("uri=", ""));

    return new ResponseEntity<>(body, HttpStatus.NOT_FOUND);
  }

  /**
   * Manipula IllegalArgumentException e retorna uma resposta HTTP 400 Bad
   * Request.
   * Esta exceção é útil para quando a lógica de negócio detecta dados de entrada
   * inválidos.
   *
   * @param ex      A exceção IllegalArgumentException.
   * @param request A requisição web atual.
   * @return Um ResponseEntity com status 400 e um corpo de erro detalhado.
   */
  @ExceptionHandler(IllegalArgumentException.class)
  public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex, WebRequest request) {
    Map<String, Object> body = new LinkedHashMap<>();
    body.put("timestamp", LocalDateTime.now());
    body.put("status", HttpStatus.BAD_REQUEST.value());
    body.put("error", "Bad Request");
    body.put("message", ex.getMessage());
    body.put("path", request.getDescription(false).replace("uri=", ""));

    return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
  }
}
