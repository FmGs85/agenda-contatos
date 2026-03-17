# Agenda de Contatos

API RESTful para gerenciamento de agenda de contatos pessoal.

# Descrição

API que permite aos usuários gerenciar seus contatos pessoais com operações de criação, visualização, atualização e exclusão. Cada usuário possui sua própria agenda protegida por autenticação JWT. O sistema conta com controle de acesso baseado em roles (administrador e usuário regular), validação de dados de entrada e armazenamento seguro de senhas com hash bcrypt.

# Tecnologias Utilizadas

- Node.js
- Express
- MySQL (mysql2)
- JWT para autenticação (jsonwebtoken)
- bcryptjs para hash de senhas
- express-validator para validação
- helmet e cors para segurança
- nodemon para desenvolvimento
- dotenv para variáveis de ambiente

# Estrutura de Pastas

```
src/
  config/
    database.js
  controllers/
    authController.js
    contactController.js
    userController.js
  models/
    User.js
    Contact.js
  routes/
    authRoutes.js
    contactRoutes.js
    userRoutes.js
  security/
    auth.js
    validators.js
  services/
    authService.js
    contactService.js
    userService.js
  app.js
database.sql
.env.example
package.json
README.md
```

# Pré-requisitos

- Node.js instalado
- npm
- MySQL instalado e rodando

# Instalação

1. Clone o repositório:

```bash
git clone https://github.com/FmGs85/agenda-contatos.git
```

2. Entre na pasta:

```bash
cd agenda-contatos
```

3. Instale dependências:

```bash
npm install
```

4. Crie o banco de dados no MySQL:

```bash
mysql -u root -p < database.sql
```

5. Configure o arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais do MySQL.

# Execução do Projeto

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

# Endpoints da API

## Autenticação

```
POST /api/auth/register  - Cadastro de novo usuário
POST /api/auth/login     - Login e geração do token JWT
```

## Usuários

```
GET /api/users/me        - Retorna perfil do usuário autenticado
GET /api/users           - Lista todos os usuários (somente admin)
```

## Contatos

```
GET    /api/contacts      - Lista contatos do usuário autenticado
POST   /api/contacts      - Cria novo contato
GET    /api/contacts/:id  - Retorna contato específico
PUT    /api/contacts/:id  - Atualiza contato
DELETE /api/contacts/:id  - Remove contato
```

# Autenticação

A API utiliza autenticação baseada em JWT (Bearer Token).

Após o login ou registro, o token é retornado na resposta. Para acessar rotas protegidas, envie o token no header:

```
Authorization: Bearer <seu_token>
```

Roles disponíveis:
- **user** — acesso aos próprios contatos
- **admin** — acesso aos próprios contatos e listagem de todos os usuários

# Regras de Negócio

- Os usuários devem ser cadastrados com nome e email
- O email é chave única (não permite duplicatas)
- Os contatos devem conter pelo menos um nome e uma forma de contato (telefone ou email)
- Somente usuários autenticados podem criar, atualizar e excluir contatos
- Cada usuário só acessa seus próprios contatos (admin pode visualizar qualquer contato)
- Senhas são armazenadas com hash bcrypt
- Entradas são validadas para evitar dados incorretos ou maliciosos

# Variáveis de Ambiente

```
PORT=3000
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=24h
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=agenda_contatos
```

# Exemplos de Uso

Registrar usuário:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Fábio","email":"fabio@email.com","password":"123456"}'
```

Login:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"fabio@email.com","password":"123456"}'
```

Criar contato:

```bash
curl -X POST http://localhost:3000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"name":"João Silva","phone":"(21) 99999-0000","email":"joao@email.com"}'
```

Listar contatos:

```bash
curl http://localhost:3000/api/contacts \
  -H "Authorization: Bearer SEU_TOKEN"
```

# Autor

Fábio Melo Guimarães da Silva — Análise e Desenvolvimento de Sistemas — SENAC RJ
Jorge Daniel Figueiredo Camelo - Análise e Desenvolvimento de Sistemas — SENAC RJ

# Licença

Senac RJ.
