# POC OAuth

Proof of Concept para implementação de autenticação OAuth 2.0, explorando dois cenários distintos: como **client** (consumindo providers externos) e como **server** (sendo o próprio provider de tokens).

## 📋 Estrutura do Projeto

```
poc-oauth/
├── api/                    # Backend (Express + TypeScript)
│   ├── src/
│   │   ├── middlewares/    # Middlewares de autenticação e tratamento de erros
│   │   ├── modules/        # Módulos da aplicação (auth, user)
│   │   ├── services/       # Serviços compartilhados (database)
│   │   └── shared/         # Utilitários e erros customizados
│   └── package.json
│
├── application/            # Frontend (Nuxt 3 + Vue 3 + Tailwind CSS)
│   ├── composables/        # Composables (useApi, useAuth)
│   ├── layouts/            # Layouts da aplicação
│   ├── middleware/         # Middlewares de navegação
│   ├── pages/              # Páginas da aplicação
│   └── package.json
│
└── README.md
```

## 🌿 Branches

| Branch | Descrição |
|--------|-----------|
| `main` | Base do projeto com a estrutura inicial e configurações básicas |
| `poc/oauth-client` | Implementação do OAuth como **client**, integrando com providers externos (Google e Facebook) para autenticação |
| `poc/oauth-server` | Implementação do OAuth como **server**, onde o backend atua como provider emitindo seus próprios tokens |

### 🔹 Branch: `main`

Contém apenas a estrutura base do projeto:
- Configuração do Express com TypeScript
- Configuração do Nuxt 3 com Vue 3 e Tailwind CSS
- Estrutura modular para autenticação e usuários
- Middlewares de autenticação e tratamento de erros

### 🔹 Branch: `poc/oauth-client`

Cenário onde o **backend e frontend atuam como clients OAuth**, delegando a autenticação para providers externos:

- **Google OAuth 2.0**: Autenticação via conta Google
- **Facebook OAuth 2.0**: Autenticação via conta Facebook
- Fluxo de Authorization Code
- Troca de tokens com os providers
- Criação/vinculação de usuários locais após autenticação externa

### 🔹 Branch: `poc/oauth-server`

Cenário onde o **backend atua como OAuth Server/Provider**:

- Emissão de tokens de acesso (Access Tokens)
- Emissão de tokens de atualização (Refresh Tokens)
- Validação e revogação de tokens
- Fluxos de autenticação próprios
- Gerenciamento de escopos e permissões

## 🚀 Tecnologias

### Backend (API)
- **Express** - Framework web para Node.js
- **TypeScript** - Superset tipado do JavaScript
- **TSyringe** - Injeção de dependências
- **Zod** - Validação de schemas

### Frontend (Application)
- **Nuxt 3** - Framework Vue.js
- **Vue 3** - Framework reativo para UI
- **Tailwind CSS** - Framework de estilização utilitária
- **TypeScript** - Superset tipado do JavaScript

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (v18+)
- npm ou yarn

### Backend (API)

```bash
cd api
npm install
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Frontend (Application)

```bash
cd application
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3001`

## 📚 Como Usar

1. Clone o repositório
2. Para explorar o cenário de **OAuth Client**, faça checkout para a branch correspondente:
   ```bash
   git checkout poc/oauth-client
   ```
3. Para explorar o cenário de **OAuth Server**, faça checkout para a branch correspondente:
   ```bash
   git checkout poc/oauth-server
   ```
4. Siga as instruções específicas de cada branch (documentadas em seus respectivos READMEs)

## 📖 Referências

- [OAuth 2.0 Specification (RFC 6749)](https://tools.ietf.org/html/rfc6749)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Facebook OAuth Documentation](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow)

---

> **Nota**: Este é um projeto de POC (Proof of Concept) destinado a estudos e experimentação. Não utilize diretamente em produção sem as devidas adaptações de segurança.
