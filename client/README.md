# 📌 Client JSONPlaceholder - Front End

Este é o **projeto front end** do sistema que consome a API [JSONPlaceholder](https://jsonplaceholder.typicode.com/) ou uma réplica local da mesma (que se encontra na raiz do repositório, no diretório `/argonock`).

👉 O front end possui um **Switcher** que permite alternar entre:

* **API Local (`/argonock`)**: possui sistema de autenticação com **JWT**.
* **API JSONPlaceholder**: simula um login básico sem autenticação real.

---

## 🚀 Tecnologias Utilizadas

* **Framework:** Angular 20
* **Gerenciador de Pacotes:** npm
* **Estilização:** CSS puro
* **Consumo de API:** Axios
* **Gerenciamento de Estado:** Services + NgRx

---

## 📂 Estrutura do Repositório

```
/argonock   → API local (backend - não faz parte deste guia)
/client     → Projeto Front End (Angular)
```

Este guia cobre apenas a configuração e execução do **front end** (`/client`).

---

## ⚙️ Pré-requisitos

Antes de iniciar, verifique se você possui instalado:

* [Node.js](https://nodejs.org/) **>= 20.x**
* [npm](https://www.npmjs.com/) (instalado junto com o Node.js)
* [Angular CLI](https://angular.io/cli) **>= 20.x**

Para instalar o Angular CLI:

```bash
npm install -g @angular/cli
```

---

## 🔧 Configuração do Projeto

1. **Clone o repositório** (caso ainda não tenha feito):

   ```bash
   git clone git@github.com:bernardoenock/argos_enock.git
   cd client
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Configuração da API**
   O projeto já vem configurado com um **Switcher** no front end que permite alternar entre:

   * **API Local (`/argonock`)**
   * **API JSONPlaceholder**

   ⚠️ Caso vá utilizar a API local, certifique-se de que o backend (`/argonock`) está rodando antes de iniciar o front end.

---

## ▶️ Executando o Projeto

### 1. Modo desenvolvimento

Para rodar o servidor de desenvolvimento do Angular:

```bash
npm start
```

ou

```bash
ng serve
```

O front end ficará disponível em:
👉 [http://localhost:4200](http://localhost:4200)

### 2. Build de produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
```

Os arquivos finais ficarão disponíveis no diretório:

```
/client/dist/client
```

---

## 📌 Notas Importantes

* Se usar a **API JSONPlaceholder**, o login será apenas **simulado**.
* Se usar a **API local (`/argonock`)**, o login será feito via **JWT** com segurança real.
* Você pode alternar entre as APIs diretamente no front end pelo **Switcher**.

---

## ✅ Resumo dos Comandos

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Build para produção
npm run build
```

---

📚 **Referências:**

* [Angular Docs](https://angular.io/docs)
* [NgRx Docs](https://ngrx.io/docs)
* [Axios Docs](https://axios-http.com/)

---

