# POC OAuth - Arquitetura

Este projeto demonstra uma implementação de OAuth Provider com uma arquitetura de 3 camadas.

## Arquitetura

```
┌──────────────┐
│   Frontend   │ (porta 3000)
│  (Nuxt.js)   │
└──────┬───────┘
       │
       │ HTTP Requests
       │
┌──────▼───────┐
│     BFF      │ (porta 3002)
│   (Express)  │
└──────┬───────┘
       │
       │ HTTP Requests
       │
┌──────▼───────┐
│    OAuth     │ (porta 3001)
│   Provider   │
│  (Express)   │
└──────────────┘
```

## Componentes

### 1. Frontend (application/)
- **Tecnologia**: Nuxt.js 3 + Vue 3 + TypeScript
- **Porta**: 3000
- **Responsabilidade**: Interface do usuário
- **Comunicação**: Faz requisições para o BFF

### 2. BFF - Backend for Frontend (bff/)
- **Tecnologia**: Express + TypeScript
- **Porta**: 3002
- **Responsabilidade**: 
  - Camada intermediária entre frontend e OAuth Provider
  - Validação de dados
  - Formatação de requisições
  - Tratamento de erros específicos do frontend
- **Comunicação**: 
  - Recebe requisições do frontend
  - Comunica-se com o OAuth Provider via HTTP

### 3. OAuth Provider (api/)
- **Tecnologia**: Express + TypeScript
- **Porta**: 3001
- **Responsabilidade**:
  - Gerenciamento de autenticação
  - Emissão de tokens OAuth
  - Gerenciamento de usuários
  - Validação de tokens
- **Banco de Dados**: In-Memory (para POC)

## Fluxo de Autenticação

### Sign Up
```
Frontend -> BFF -> OAuth Provider
  1. Usuário preenche formulário
  2. Frontend envia dados para /api/auth/sign-up (BFF)
  3. BFF valida e formata os dados
  4. BFF envia para /auth/sign-up (OAuth Provider)
  5. OAuth Provider cria usuário e gera token
  6. Resposta retorna através da cadeia: Provider -> BFF -> Frontend
```

### Sign In
```
Frontend -> BFF -> OAuth Provider
  1. Usuário preenche credenciais
  2. Frontend envia para /api/auth/sign-in (BFF)
  3. BFF valida e formata os dados
  4. BFF envia para /auth/sign-in (OAuth Provider)
  5. OAuth Provider valida credenciais e gera token
  6. Token retorna através da cadeia: Provider -> BFF -> Frontend
```

### Requisições Autenticadas
```
Frontend -> BFF -> OAuth Provider
  1. Frontend envia token no header Authorization
  2. BFF valida formato do token
  3. BFF repassa requisição com token para OAuth Provider
  4. OAuth Provider valida token e processa requisição
  5. Resposta retorna através da cadeia
```

## Estrutura de Pastas

### BFF (bff/)
```
bff/
├── src/
│   ├── server.ts                 # Entry point
│   ├── middlewares/
│   │   ├── authMiddleware.ts    # Validação de token
│   │   └── errorHandler.ts      # Tratamento de erros
│   ├── modules/
│   │   └── auth/
│   │       ├── controllers/     # Recebem requisições HTTP
│   │       ├── routes/          # Definição de rotas
│   │       └── usecases/        # Lógica de negócio
│   ├── services/
│   │   ├── httpClient.ts        # Cliente HTTP (Axios)
│   │   └── oauthService.ts      # Comunicação com OAuth Provider
│   └── shared/
│       └── errors/              # Classes de erro customizadas
├── package.json
└── tsconfig.json
```

### OAuth Provider (api/)
```
api/
├── src/
│   ├── server.ts                 # Entry point
│   ├── middlewares/
│   │   ├── authMiddleware.ts    # Validação de token JWT
│   │   └── errorHandler.ts      # Tratamento de erros
│   ├── modules/
│   │   ├── auth/                # Módulo de autenticação
│   │   │   ├── controllers/
│   │   │   ├── models/
│   │   │   ├── repositories/
│   │   │   ├── routes/
│   │   │   └── usecases/
│   │   └── user/                # Módulo de usuário
│   │       ├── controllers/
│   │       ├── models/
│   │       ├── repositories/
│   │       ├── routes/
│   │       └── usecases/
│   ├── services/
│   │   └── database.ts          # In-Memory Database
│   └── shared/
│       └── errors/
├── package.json
└── tsconfig.json
```

## Como Executar

### 1. OAuth Provider
```bash
cd api
npm install
npm run dev
# Rodando em http://localhost:3001
```

### 2. BFF
```bash
cd bff
npm install
npm run dev
# Rodando em http://localhost:3002
```

### 3. Frontend
```bash
cd application
npm install
npm run dev
# Rodando em http://localhost:3000
```

## Variáveis de Ambiente

### BFF (.env)
```
PORT=3002
OAUTH_PROVIDER_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
```

## Endpoints

### BFF (porta 3002)
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-up` - Registro
- `GET /health` - Health check

### OAuth Provider (porta 3001)
- `POST /auth/sign-in` - Login
- `POST /auth/sign-up` - Registro
- `GET /auth/validate` - Validar token
- `POST /auth/refresh` - Refresh token
- `GET /user/dashboard` - Dashboard (requer autenticação)
- `GET /user/settings` - Configurações (requer autenticação)
- `PUT /user/settings` - Atualizar configurações (requer autenticação)
- `GET /health` - Health check

## Tecnologias Utilizadas

- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **Axios** - Cliente HTTP (BFF)
- **TSyringe** - Injeção de dependências
- **Zod** - Validação de dados
- **CORS** - Cross-Origin Resource Sharing

## Próximos Passos

1. Implementar refresh token no OAuth Provider
2. Adicionar suporte a OAuth 2.0 completo (authorization code flow)
3. Implementar revogação de tokens
4. Adicionar banco de dados real (PostgreSQL/MongoDB)
5. Implementar rate limiting
6. Adicionar testes unitários e de integração
7. Implementar logging estruturado
8. Adicionar monitoramento e métricas
