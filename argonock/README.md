# 📌 Argonock – Back End

Este é o **Back End** do projeto, uma réplica da API [JSONPlaceholder](https://jsonplaceholder.typicode.com/) construída com **Spring Boot 3.5.5** e **Java 21**.

Além de replicar os endpoints básicos, o sistema inclui:

* ✅ **Autenticação segura com JWT**
* ✅ **Integração com PostgreSQL**
* ✅ **Estrutura modular e escalável**
* ✅ **Documentação automática com OpenAPI (Swagger UI)**

---

## 🚀 Tecnologias Utilizadas

* **Linguagem:** Java 21
* **Framework:** Spring Boot 3.5.5
* **Banco de Dados:** PostgreSQL
* **ORM:** Spring Data JPA
* **Segurança:** Spring Security + JWT
* **Validação:** Hibernate Validator
* **Dependências auxiliares:** Lombok, DevTools, SpringDoc OpenAPI

---

## 📂 Estrutura do Repositório

```
/argonock
/client    → Front End Angular (não faz parte deste guia)
```

---

## ⚙️ Configuração do Projeto

### 1. **Clone o repositório** (caso ainda não tenha feito):

   ```bash
   git clone git@github.com:bernardoenock/argos_enock.git
   cd argonock
   ```

### 2. Banco de Dados PostgreSQL

O projeto utiliza PostgreSQL. Você pode rodar manualmente ou via **Docker Compose**.

#### 🐳 Subindo via Docker Compose:

Na raiz do projeto, configure o arquivo `.env` e rode:

```bash
docker compose up -d
```

**docker-compose.yml (trecho):**

```yaml
services:
  db:
    image: postgres:15.5-alpine
    container_name: argonock-db
    restart: always
    environment:
      POSTGRES_USER: ${SPRING_DATASOURCE_USERNAME}
      POSTGRES_PASSWORD: ${SPRING_DATASOURCE_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "${DB_PORT}:${DB_PORT}"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**.env (exemplo):**

```env
# Aplicação
APP_PORT=8080

# Banco de Dados PostgreSQL
DB_PORT=5432
DB_NAME=argonock_db
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/argonock_db
SPRING_DATASOURCE_USERNAME=seu_usuario
SPRING_DATASOURCE_PASSWORD=sua_senha
```

---

### 3. Estrutura de Pacotes

```text
com.api.argonock
├── controller    → Controllers REST para os endpoints
├── model         → Entidades e DTOs
├── repository    → Interfaces do Spring Data JPA
├── service       → Regras de negócio
├── config        → Configurações gerais (ex: CORS, segurança)
├── security      → Segurança (JWT, filtros, configs)
└── ArgonockApplication.java → Classe principal
```

#### 🔒 Segurança

```text
com.api.argonock
├── controller
│   └── AuthController.java         → Endpoint de autenticação
├── security
│   ├── Jwks.java                   → Chaves de segurança
│   ├── SecurityFilter.java         → Filtro JWT
│   └── SecurityConfigurations.java → Configurações do Spring Security
├── service
│   └── AuthorizationService.java   → Implementação do UserDetailsService
```

---

## ▶️ Executando o Projeto

### 1. Configurar variáveis de ambiente

Ajuste o arquivo `.env` conforme seu ambiente.

### 2. Subir o banco de dados (opcional via Docker)

```bash
docker compose up -d
```

### 3. Compilar e rodar o projeto

```bash
./mvnw spring-boot:run
```

ou, se tiver Maven instalado globalmente:

```bash
mvn spring-boot:run
```

A API ficará disponível em:
👉 [http://localhost:8080](http://localhost:8080)

### 4. Swagger UI

Acesse a documentação automática em:
👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## ✅ Resumo dos Comandos

```bash
# Subir banco de dados
docker compose up -d

# Rodar aplicação
mvn spring-boot:run
```

---

## 📌 Integração com o Front End

* Se usado junto ao projeto Angular (`/client`), clique no **Switcher** no front end para apontar para:

  ```
  http://localhost:8080
  ```

* O login será feito via **JWT** (credenciais padrão devem estar definidas no banco).

---

📚 **Referências:**

* [Spring Boot Docs](https://spring.io/projects/spring-boot)
* [Spring Security Docs](https://spring.io/projects/spring-security)
* [Spring Data JPA Docs](https://spring.io/projects/spring-data-jpa)
* [SpringDoc OpenAPI](https://springdoc.org/)
* [JSONPlaceholder](https://jsonplaceholder.typicode.com/)

---
