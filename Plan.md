## Planejamento do Desenvolvimento do Back-end

### Configurações Iniciais

- [x] Criar uma pasta "src" para organizar o código-fonte da aplicação.
- [x] Criar uma pasta "controllers" para organizar os controllers.
- [x] Criar uma pasta "database" para organizar os arquivos de banco de dados.
- [x] Criar uma pasta "middlewares" para organizar os middlewares.
- [x] Criar uma pasta "providers" para organizar a parte de upload da aplicação.
- [x] Criar uma pasta "routes" para organizar os arquivos de rotas.
- [x] Configurar o arquivo `server.js` com a porta da aplicação e as configurações do CORS.
- [x] Configurar o `express.json()` para lidar com dados JSON.
- [x] Criar uma pasta "utils" e dentro dela criar um arquivo `AppError.js` com uma classe para personalizar erros.
- [x] Criar o arquivo `.gitignore` e adicionar as linhas para ignorar `node_modules` e `.env`.

### Configurações de Dependências

- [x] Instalar as dependências base: `express-async-errors`, `knex`, `sqlite`, `sqlite3`, `jsonwebtoken` e `multer`.
- [x] Configurar o JWT para autenticação.
- [x] Configurar o Multer nas rotas que precisam de upload de imagens.
- [x] Executar o comando `npx knex init` para criar o arquivo `knexfile.js` com as configurações de conexão com o banco de dados.
- [x] Configurar o `knexfile.js` e adicionar o caminho onde as migrations serão salvas.

### Migrations e Banco de Dados

- [x] Criar o caminho de pastas para as migrations dentro de `database`.
- [x] Criar as migrations necessárias para criar as tabelas do banco de dados.

### Middleware de Autenticação

- [x] Criar um middleware de autenticação para proteger rotas que precisam de autenticação.
- [x] Adicionar o middleware nas rotas que precisam ser autenticadas.

### Rota de Usuário

- [x] Criar um controller para o usuário.
- [x] Criar um método de criação de um usuário.
- [x] Criptografar a senha usando o Bcrypt.

### Rota de Sessão

- [x] Criar um controller para a sessão.
- [x] Criar um método para a criação de uma sessão:
- [x] Validar se o usuário existe.
- [x] Comparar as senhas.
- [x] Gerar um token de sessão.

### Rota de Prato

- [x] Criar um controller para os pratos.
- [x] Criar um método de criação de um prato.
- [x] Implementar a lógica de criação dos ingredientes.
- [x] Criar um método de visualização de todos os pratos.
- [x] Implementar a lógica de busca por título do prato.
- [x] Implementar a lógica de busca por ingredientes.
- [x] Criar um método de visualização de um prato.
- [ ] Criar um método de edição de um prato.
- [x] Criar um método de exclusão de um prato.
