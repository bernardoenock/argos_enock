# Replicate {JSON} Placeholder 

## Backend

### Habilidades provadas

- [] Desenvolvimento de APIs RESTful seguras com Spring Boot, 
- [] Implementação de autenticação baseada em token JWT (JSON Web Token).
  
### Sobre

#### Core:
- [] API RESTful que replica funcionalidades semelhantes às oferecidas pelo JSONPlaceholder, incluindo recursos como:
  - [] postagens, 
  - [] comentários, 
  - [] álbuns, 
  - [] fotos, 
  - [] tarefas, 
  - [] usuários. 

- [] A API protegida por um sistema de autenticação JWT Bearer.

#### Tecnologias:
- [] Framework: Spring Boot (versão 3.0 ou superior);
- [] Linguagem: Java (zulu-21.42.19)
- [] Segurança: Spring Security;
- [] Autenticação: JWT (JSON Web Token);
- [] Banco de Dados: PostgreSQL;
- [] ORM: Spring Data JPA;

#### Funcionalidades:

- [] Autenticação e Autorização:
  - [] Implementar registro de usuários (signup) e login;
  - [] Gerar tokens JWT para usuários autenticados;
  - [] Proteger endpoints sensíveis, permitindo acesso apenas a usuários autenticados.

- [] Recursos da API:
  - [] Postagens (/posts):
    - [] CRUD completo (Create, Read, Update, Delete);
    - [] Relacionamento com comentários.
  - [] Comentários (/comments):
    - [] CRUD completo;
    - [] Relacionamento com postagens.
  - [] Álbuns (/albums):
    - [] CRUD completo;
    - [] Relacionamento com fotos.
  - [] Fotos (/photos):
    - [] CRUD completo;
    - [] Relacionamento com álbuns.
  - [] Tarefas (/todos):
    - [] CRUD completo;
    - [] Atribuição a usuários.
  - Usuários (/users):
    - [] CRUD completo;
    - [] Campos como nome, email, etc.
  
- [] Documentação: Utilizar Swagger/OpenAPI para documentar os endpoints da API;
- [] Testes: Implementar testes unitários e de integração;
- [] Boas Práticas: Seguir princípios de Clean Code e SOLID;


## Frontend

### Habilidades provadas
- [] Interfaces web modernas
- [] Consumo de APIs REST
- [] Gestão de estado e boas práticas de desenvolvimento utilizando Angular.
  
### Sobre

#### Core:
- [] Desenvolver o frontend de um blog consumindo a API pública JSONPlaceholder, garantindo uma experiência de usuário fluida e responsiva.


#### Tecnologias:
- [] Framework: Angular (versão 14+);
- [] Gerenciador de pacotes: npm;
- [] Estilização: CSS puro;
- [] Consumo de API: Axios;
- [] Gerenciamento de estado: Services, NgRx;
- [] Controle de versão: Git (repositório público no GitHub).
  
#### Funcionalidades:
- [] Painel Administrativo:
  - [] Tela de autenticação simples para acesso ao painel de administração;
  - [] CRUD de usuários (criação, edição, listagem e remoção);
  - [] Validações nos formulários (e.g., campos obrigatórios, formatos de email, etc.).
- [] Listagem de Postagens:
  - [] Página com a listagem de postagens;
  - [] Exibição dos detalhes de uma postagem com seus respectivos comentários;
  - [] Funcionalidade para adicionar um novo comentário em um post;
  - [] Paginação para melhorar a navegação caso haja grande volume de dados.
- [] Galeria de Álbuns:
  - [] Tela para exibição dos álbuns disponíveis;
  - [] Exibição das fotos dentro de cada álbum;
  - [] Layout responsivo e intuitivo.
- [] Diferenciais:
  - [] Implementação de testes unitários e/ou testes e2e;
  - [] Uso de TypeScript;
  - [] Adoção de boas práticas de acessibilidade (A11Y);
  - [] Design otimizado para dispositivos móveis (Mobile First);
  - [] Deploy em um ambiente acessível (Vercel, Netlify, Firebase Hosting, AWS, etc.).

## Full Stack

- [] Controle de Versão: Commits frequentes e mensagens claras no Git.
- [] Um README detalhado contendo:
  - [] Instruções para configurar e executar o projeto;
  - [] Descrição dos endpoints disponíveis;
  - [] Detalhes sobre a implementação da autenticação JWT;
  - [] Possíveis melhorias futuras.