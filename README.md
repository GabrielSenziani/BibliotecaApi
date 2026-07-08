# BibliotecaApi

API RESTful para gerenciamento de livros, com autenticação de usuários, controle de empréstimos e deploy contínuo.

**API em produção:** https://bibliotecaapi-24db.onrender.com

> **Observação:** O deploy utiliza o plano gratuito do Render. A primeira requisição após um período de inatividade pode levar alguns segundos enquanto o serviço é iniciado, e como existem middlewares, a requisição get livros fica como não autorizada no navegador, por isso é necessário acessar a rota POST /cadastro e POST /login, antes de acessar a rota GET /livros.

---

# Tecnologias

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

# Estrutura do projeto

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
└── package.json
```

---

# Como executar com Docker

## Pré-requisitos

- Docker
- Docker Compose

## Clone o repositório

```bash
git clone https://github.com/GabrielSenziani/BibliotecaApi.git
cd BibliotecaApi
```

## Crie o arquivo `.env`

```env
MONGO_URI=mongodb://database:27017/biblioteca
JWT_SECRET=sua_chave_secreta
```

## Inicie os containers

```bash
docker compose up
```

A aplicação ficará disponível em:

```
http://localhost:3000
```

O MongoDB será executado em um container separado, sem necessidade de instalação local.

---

# Executando os testes

Os testes foram desenvolvidos com Jest e Supertest e cobrem os principais fluxos da aplicação.

```bash
npm test
```

A suíte de testes também é executada automaticamente pelo GitHub Actions a cada push para o repositório.

---

# Autenticação

A maior parte das rotas da API exige autenticação utilizando JWT.

Fluxo:

1. Cadastre um usuário em:

```
POST /usuarios/cadastro
```

2. Faça login em:

```
POST /usuarios/login
```

3. Utilize o token retornado no cabeçalho das requisições protegidas:

```http
Authorization: Bearer SEU_TOKEN
```

---

# Endpoints

## Usuários

| Método | Rota | Autenticação | Descrição |
|---------|------|--------------|-----------|
| POST | `/usuarios/cadastro` | Não | Cadastra um usuário |
| POST | `/usuarios/login` | Não | Realiza login e retorna um token JWT |

### Exemplo de cadastro

```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

A senha deve possuir:

- mínimo de 6 caracteres;
- pelo menos uma letra;
- pelo menos um número.

---

## Livros

| Método | Rota | Autenticação | Descrição |
|---------|------|--------------|-----------|
| GET | `/livros` | Sim | Lista todos os livros |
| GET | `/livros/:id` | Sim | Busca um livro pelo ID |
| POST | `/livros` | Sim | Cadastra um livro |
| PUT | `/livros/:id` | Sim | Atualiza um livro |
| DELETE | `/livros/:id` | Sim | Remove um livro |
| POST | `/livros/:id/emprestar` | Sim | Marca um livro como emprestado |
| POST | `/livros/:id/devolver` | Sim | Marca um livro como disponível |

### Exemplo de cadastro de livro

```json
{
  "titulo": "O Senhor dos Anéis",
  "autor": "J.R.R. Tolkien"
}
```

---

# Respostas de erro

| Status | Descrição |
|---------|-----------|
| 400 | Campos obrigatórios ausentes, inválidos ou ID mal formatado |
| 401 | Token ausente ou inválido |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

# Integração e Deploy

## Integração Contínua (CI)

A cada push para o repositório, o GitHub Actions:

- instala as dependências;
- configura as variáveis de ambiente utilizando os *Secrets* do GitHub;
- executa toda a suíte de testes automaticamente.

## Entrega Contínua (CD)

O deploy é realizado automaticamente pelo Render sempre que há um push na branch `main`.

---

# Licença

Projeto desenvolvido para fins de estudo e portfólio.
