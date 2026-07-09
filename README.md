# BibliotecaApi

API RESTful desenvolvida com Node.js e Express para gerenciamento de livros, autenticação de usuários utilizando JWT e controle de empréstimos.

A aplicação conta com testes automatizados, containerização com Docker, integração contínua com GitHub Actions e deploy automático no Render.

## API em produção

https://bibliotecaapi-24db.onrender.com

> **Observação:** O projeto está hospedado no plano gratuito do Render. A primeira requisição após um período de inatividade pode levar alguns segundos enquanto o serviço é iniciado.

---

## Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- CRUD completo de livros
- Empréstimo e devolução de livros
- Validação de dados
- Proteção de rotas
- Testes automatizados com Jest e Supertest
- Containerização com Docker
- Integração Contínua (GitHub Actions)
- Deploy Contínuo (Render)

---

## Stack utilizada

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt
- Docker
- Docker Compose
- Jest
- Supertest
- GitHub Actions
- Render

---

## Estrutura do projeto

```text
BibliotecaApi/
├── .github/
│   └── workflows/
│       └── tests.yml
├── src/
│   ├── controllers/
│   │   ├── livrosController.js
│   │   └── usuariosController.js
│   ├── database/
│   │   └── connection.js
│   ├── middlewares/
│   │   └── auth.js
│   ├── models/
│   │   ├── Livro.js
│   │   └── Usuario.js
│   ├── routes/
│   │   ├── livros.js
│   │   └── usuario.js
│   ├── tests/
│   │   ├── livros.test.js
│   │   └── usuario.test.js
│   ├── app.js
│   └── server.js
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── LICENSE
├── package.json
└── README.md
```

---

## Como executar o projeto

### Pré-requisitos

- Docker
- Docker Compose

### Clone o repositório

```bash
git clone https://github.com/GabrielSenziani/BibliotecaApi.git

cd BibliotecaApi
```

### Configure o arquivo `.env`

```env
MONGO_URI=mongodb://database:27017/biblioteca
JWT_SECRET=sua_chave_secreta
```

### Execute os containers

```bash
docker compose up
```

A API ficará disponível em:

```
http://localhost:3000
```

O MongoDB será iniciado em um container separado.

---

## Executando os testes

Os testes utilizam Jest e Supertest para validar os principais fluxos da aplicação.

```bash
npm test
```

Os testes também são executados automaticamente pelo GitHub Actions a cada push realizado no repositório.

---

## Autenticação

A maior parte das rotas exige autenticação via JWT.

Fluxo de autenticação:

1. Cadastre um usuário

```
POST /usuarios/cadastro
```

2. Faça login

```
POST /usuarios/login
```

3. Utilize o token retornado nas requisições protegidas

```http
Authorization: Bearer SEU_TOKEN
```

---

## Endpoints

### Usuários

| Método | Endpoint | Autenticação | Descrição |
|---------|----------|--------------|-----------|
| POST | `/usuarios/cadastro` | Não | Cadastro de usuário |
| POST | `/usuarios/login` | Não | Login e geração do token JWT |

### Exemplo

```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

A senha deve conter:

- mínimo de 6 caracteres;
- pelo menos uma letra;
- pelo menos um número.

---

### Livros

| Método | Endpoint | Autenticação | Descrição |
|---------|----------|--------------|-----------|
| GET | `/livros` | Sim | Lista todos os livros |
| GET | `/livros/:id` | Sim | Busca um livro por ID |
| POST | `/livros` | Sim | Cadastra um livro |
| PUT | `/livros/:id` | Sim | Atualiza um livro |
| DELETE | `/livros/:id` | Sim | Remove um livro |
| POST | `/livros/:id/emprestar` | Sim | Marca um livro como emprestado |
| POST | `/livros/:id/devolver` | Sim | Marca um livro como disponível |

### Exemplo

```json
{
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien"
}
```

---

## Respostas de erro

| Status | Descrição |
|---------|-----------|
| 400 | Campos obrigatórios ausentes, inválidos ou ID mal formatado |
| 401 | Token ausente ou inválido |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

## CI/CD

### Integração Contínua (CI)

A cada push para o repositório, o GitHub Actions:

- instala as dependências;
- configura as variáveis de ambiente utilizando os Secrets do GitHub;
- executa automaticamente toda a suíte de testes.

### Entrega Contínua (CD)

A aplicação é publicada automaticamente no Render sempre que um novo commit é enviado para a branch `main`.

---

# Licença

MIT © [Gabriel Senziani](https://github.com/GabrielSenziani)
