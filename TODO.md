# Replicate {JSON} Placeholder 

## Back End

### Habilidades provadas

- [X] Desenvolvimento de APIs RESTful seguras com Spring Boot, 
- [X] Implementação de autenticação baseada em token JWT (JSON Web Token).
  
### Sobre

#### Core:
- [X] API RESTful que replica funcionalidades semelhantes às oferecidas pelo JSONPlaceholder, incluindo recursos como:
  - [X] postagens, 
  - [X] comentários, 
  - [X] álbuns, 
  - [X] fotos, 
  - [X] tarefas, 
  - [X] usuários. 

- [X] A API protegida por um sistema de autenticação JWT Bearer.

#### Tecnologias:
- [X] Framework: Spring Boot (versão 3.0 ou superior);
- [X] Linguagem: Java (zulu-21.42.19)
- [X] Segurança: Spring Security;
- [X] Autenticação: JWT (JSON Web Token);
- [X] Banco de Dados: PostgreSQL;
- [X] ORM: Spring Data JPA;

#### Funcionalidades:

- [X] Autenticação e Autorização:
  - [X] Implementar registro de usuários (signup) e login;
  - [X] Gerar tokens JWT para usuários autenticados;
  - [X] Proteger endpoints sensíveis, permitindo acesso apenas a usuários autenticados.

- [X] Recursos da API:
  - [X] Postagens (/posts):
    - [X] CRUD completo (Create, Read, Update, Delete);
    - [X] Relacionamento com comentários.
  - [X] Comentários (/comments):
    - [X] CRUD completo;
    - [X] Relacionamento com postagens.
  - [X] Álbuns (/albums):
    - [X] CRUD completo;
    - [X] Relacionamento com fotos.
  - [X] Fotos (/photos):
    - [X] CRUD completo;
    - [X] Relacionamento com álbuns.
  - [X] Tarefas (/todos):
    - [X] CRUD completo;
    - [X] Atribuição a usuários.
  - Usuários (/users):
    - [X] CRUD completo;
    - [X] Campos como nome, email, etc.
  
- [] Documentação: Utilizar Swagger/OpenAPI para documentar os endpoints da API;
- [] Testes: Implementar testes unitários e de integração;
- [] Boas Práticas: Seguir princípios de Clean Code e SOLID;


## Front End

### Habilidades provadas
- [X] Interfaces web modernas
- [X] Consumo de APIs REST
- [X] Gestão de estado e boas práticas de desenvolvimento utilizando Angular.
  
### Sobre

#### Core:
- [X] Desenvolver o frontend de um blog consumindo a API pública JSONPlaceholder, garantindo uma experiência de usuário fluida e responsiva.


#### Tecnologias:
- [X] Framework: Angular (versão 20);
- [X] Gerenciador de pacotes: npm;
- [X] Estilização: CSS puro;
- [X] Consumo de API: Axios;
- [X] Gerenciamento de estado: Services, NgRx;
- [X] Controle de versão: Git (repositório público no GitHub).
  
#### Funcionalidades:
- [X] Painel Administrativo:
  - [X] Tela de autenticação simples para acesso ao painel de administração;
  - [X] CRUD de usuários (criação, edição, listagem e remoção);
  - [] Validações nos formulários (e.g., campos obrigatórios, formatos de email, etc.).
- [X] Listagem de Postagens:
  - [X] Página com a listagem de postagens;
  - [X] Exibição dos detalhes de uma postagem com seus respectivos comentários;
  - [] Funcionalidade para adicionar um novo comentário em um post;
  - [] Paginação para melhorar a navegação caso haja grande volume de dados.
- [X] Galeria de Álbuns:
  - [X] Tela para exibição dos álbuns disponíveis;
  - [X] Exibição das fotos dentro de cada álbum;
  - [] Layout responsivo e intuitivo.
- [] Diferenciais:
  - [] Implementação de testes unitários e/ou testes e2e;
  - [X] Uso de TypeScript;
  - [] Adoção de boas práticas de acessibilidade (A11Y);
  - [] Design otimizado para dispositivos móveis (Mobile First);
  - [] Deploy em um ambiente acessível (Vercel, Netlify, Firebase Hosting, AWS, etc.).

## Full Stack

- [X] Controle de Versão: Commits frequentes e mensagens claras no Git.
- [] Um README detalhado contendo:
  - [] Instruções para configurar e executar o projeto;
  - [] Descrição dos endpoints disponíveis;
  - [] Detalhes sobre a implementação da autenticação JWT;
  - [] Possíveis melhorias futuras.