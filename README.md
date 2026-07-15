# BibliotecaApi

API RESTful desenvolvida com **Node.js** e **Express** para gerenciamento de livros, autenticação de usuários utilizando **JWT**, controle de empréstimos e upload de capas utilizando **Cloudinary**.

A aplicação conta com testes automatizados, logs estruturados com Winston, containerização utilizando Docker, integração contínua com GitHub Actions e deploy automático no Render.

---

# API em produção

https://bibliotecaapi-24db.onrender.com

> O projeto está hospedado no plano gratuito do Render. A primeira requisição após um período de inatividade pode levar alguns segundos enquanto o serviço é iniciado.

---

# Funcionalidades

- Cadastro de usuários
- Login com autenticação JWT
- CRUD completo de livros
- Upload de capas de livros utilizando Cloudinary
- Empréstimo de livros
- Devolução de livros
- Paginação na listagem de livros
- Validação de dados
- Proteção de rotas com JWT
- Logs estruturados utilizando Winston
- Testes automatizados com Jest e Supertest
- Containerização com Docker
- Integração Contínua (GitHub Actions)
- Deploy Contínuo (Render)

---

# Stack utilizada

### Backend

- Node.js
- Express

### Banco de Dados

- MongoDB
- Mongoose

### Autenticação

- JSON Web Token (JWT)
- bcrypt

### Upload de arquivos

- Multer
- Cloudinary
- Streamifier

### Observabilidade

- Winston

### Testes

- Jest
- Supertest

### DevOps

- Docker
- Docker Compose
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
│   ├── config/
│   │   ├── cloudinary.js
│   │   ├── logger.js
│   │   └── multer.js
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

# ⚙️ Como executar o projeto

## Pré-requisitos

- Docker
- Docker Compose

## Clone o repositório

```bash
git clone https://github.com/GabrielSenziani/BibliotecaApi.git

cd BibliotecaApi
```

---

## Configure o arquivo `.env`

```env
MONGO_URI=mongodb://database:27017/biblioteca

JWT_SECRET=sua_chave_secreta

CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=sua_api_secret
```

---

## Execute os containers

```bash
docker compose up
```

A API ficará disponível em:

```
http://localhost:3000
```

O MongoDB será iniciado em um container separado.

---

# Executando os testes

Os testes utilizam **Jest** e **Supertest** para validar os principais fluxos da aplicação.

```bash
npm test
```

Toda a suíte de testes também é executada automaticamente pelo GitHub Actions a cada push realizado para o repositório.

---

# Autenticação

A maior parte das rotas exige autenticação via JWT.

Fluxo:

### 1. Cadastro

```
POST /usuarios/cadastro
```

### 2. Login

```
POST /usuarios/login
```

### 3. Utilize o token retornado

```
Authorization: Bearer SEU_TOKEN
```

---

# Endpoints

## Usuários

| Método | Endpoint | Autenticação | Descrição |
|---------|----------|--------------|-----------|
| POST | /usuarios/cadastro | ❌ | Cadastro de usuário |
| POST | /usuarios/login | ❌ | Login e geração do JWT |

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

## Livros

| Método | Endpoint | Autenticação | Descrição |
|---------|----------|--------------|-----------|
| GET | /livros | ✅ | Lista os livros (com paginação) |
| GET | /livros/:id | ✅ | Busca um livro por ID |
| POST | /livros | ✅ | Cadastra um livro |
| POST | /livros/:id/capa | ✅ | Upload da capa do livro |
| POST | /livros/:id/emprestar | ✅ | Empresta um livro |
| POST | /livros/:id/devolver | ✅ | Devolve um livro |
| PUT | /livros/:id | ✅ | Atualiza um livro |
| DELETE | /livros/:id | ✅ | Remove um livro |

### Exemplo

```json
{
    "titulo": "O Senhor dos Anéis",
    "autor": "J.R.R. Tolkien"
}
```

---

# Upload de capas

A API permite realizar upload de imagens para representar a capa de um livro.

### Endpoint

```http
POST /livros/:id/capa
```

### Tipo da requisição

```
multipart/form-data
```

### Campo esperado

| Campo | Tipo |
|--------|------|
| capa | File |

### Formatos aceitos

- JPG
- JPEG
- PNG
- WEBP

### Tamanho máximo

```
5 MB
```

As imagens são armazenadas no **Cloudinary**, enquanto apenas a URL pública é salva no MongoDB.

---

# Respostas de erro

| Status | Descrição |
|---------|-----------|
| 400 | Dados inválidos, campos obrigatórios ausentes ou ID mal formatado |
| 401 | Token ausente ou inválido |
| 404 | Recurso não encontrado |
| 500 | Erro interno do servidor |

---

# CI/CD

## Integração Contínua (CI)

A cada push para o GitHub, o GitHub Actions:

- instala as dependências;
- configura as variáveis de ambiente utilizando os Secrets;
- executa automaticamente toda a suíte de testes.

---

## Entrega Contínua (CD)

Após a aprovação dos testes, o Render realiza automaticamente um novo deploy da aplicação hospedada.

---
# Licença

MIT © [Gabriel Senziani](https://github.com/GabrielSenziani)
