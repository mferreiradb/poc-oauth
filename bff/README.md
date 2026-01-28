# BFF (Backend for Frontend) - POC OAuth

Este é o BFF (Backend for Frontend) para a POC de OAuth. Ele atua como uma camada intermediária entre o frontend e o OAuth Provider.

## Estrutura

```
bff/
├── src/
│   ├── server.ts                 # Servidor principal
│   ├── middlewares/              # Middlewares
│   │   ├── authMiddleware.ts
│   │   ├── errorHandler.ts
│   │   └── index.ts
│   ├── modules/                  # Módulos da aplicação
│   │   └── auth/
│   │       ├── controllers/
│   │       ├── routes/
│   │       └── usecases/
│   ├── services/                 # Serviços
│   │   ├── httpClient.ts        # Cliente HTTP para comunicação com OAuth Provider
│   │   └── oauthService.ts      # Serviço de comunicação com OAuth Provider
│   └── shared/                   # Recursos compartilhados
│       └── errors/
├── package.json
└── tsconfig.json
```

## Scripts

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build
npm run build

# Produção
npm start
```

## Configuração

O BFF roda por padrão na porta **3002** e se comunica com o OAuth Provider na porta **3001**.

Para alterar a URL do OAuth Provider, defina a variável de ambiente:

```bash
OAUTH_PROVIDER_URL=http://localhost:3001
```

## Endpoints

### Autenticação
- `POST /api/auth/sign-in` - Login
- `POST /api/auth/sign-up` - Registro

### Health Check
- `GET /health` - Verifica status do serviço

## Fluxo

1. Frontend faz requisições para o BFF (porta 3002)
2. BFF valida e formata os dados
3. BFF comunica-se com o OAuth Provider (porta 3001)
4. BFF retorna a resposta para o Frontend

## Tecnologias

- Express
- TypeScript
- Axios (para comunicação HTTP)
- TSyringe (Injeção de Dependência)
- Zod (Validação)
