# 📌 Projeto Full Stack – Spring Boot + Angular

Este repositório contém um projeto **full stack** que combina:

* **Front End (`/client`)** → Aplicação Angular 20 que consome APIs.
* **Back End (`/argonock`)** → Réplica da API [JSONPlaceholder](https://jsonplaceholder.typicode.com/) construída com Spring Boot + PostgreSQL.

---

## 🚀 Visão Geral

O objetivo do projeto é fornecer um ambiente completo que permite:

* Alternar entre **API local (argonock)** e **API pública JSONPlaceholder** via Switcher no front end.
* Realizar **login simulado** quando conectado à API JSONPlaceholder.
* Utilizar **login real com JWT** quando conectado à API local (`argonock`).

---

## 📂 Estrutura do Repositório

```
/argonock   → Back End (Spring Boot + PostgreSQL)
/client     → Front End (Angular 20 + NgRx + Axios)
```

Cada módulo possui seu próprio **README detalhado** com instruções específicas de instalação e execução.

* 👉 [📘 Instruções do Back End (/argonock)](./argonock/README.md)
* 👉 [📗 Instruções do Front End (/client)](./client/README.md)

---

## ⚙️ Tecnologias Utilizadas

### Front End

* Angular 20
* NgRx (gerenciamento de estado)
* Axios (requisições HTTP)
* CSS puro

### Back End

* Java 21 + Spring Boot 3.5.5
* Spring Security + JWT
* PostgreSQL + Spring Data JPA
* Lombok, Validation, DevTools
* OpenAPI (Swagger UI)

---

## ▶️ Execução Rápida

### 1. Clone o repositório

```bash
git clone git@github.com:bernardoenock/argos_enock.git
cd argos_enock
```

### 2. Configure o Back End

Siga as instruções do [README do Argonock](./argonock/README.md) para rodar a API local com PostgreSQL.

### 3. Configure o Front End

Siga as instruções do [README do Client](./client/README.md) para rodar o Angular.

---

## 📌 Notas Importantes

* Se utilizar a **API JSONPlaceholder**, o login será apenas **simulado**.
* Se utilizar a **API local (`argonock`)**, o login será feito via **JWT** com autenticação real.
* O **Switcher** no front end permite trocar facilmente entre as duas opções.

---

📚 **Referências Úteis:**

* [JSONPlaceholder](https://jsonplaceholder.typicode.com/)
* [Angular Docs](https://angular.io/docs)
* [Spring Boot Docs](https://spring.io/projects/spring-boot)
* [NgRx Docs](https://ngrx.io/docs)
* [Axios Docs](https://axios-http.com/)

---
