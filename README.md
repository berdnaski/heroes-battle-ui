# Heroes Battle UI 🦸‍♂️⚔️

Frontend em Angular para o sistema de batalha de heróis, integrado à Heroes Battle API.

## 🚀 Tecnologias

- Angular 18
- TypeScript
- PrimeNG e PrimeIcons
- SCSS (layout próprio com CSS Grid)
- RxJS
- Node.js 20+

## 📋 Funcionalidades

- ✅ Lista de Heróis com filtros (nome, ataque, defesa)
- ✅ Cadastro de novo herói
- ✅ Batalha com previsão de dano e vida, usando toast para feedback
- ✅ Layout responsivo e organizado com SCSS próprio
- ✅ Integração com API (GET/POST/PUT)

## 🏗️ Estrutura do Projeto

```
src/app/
├── app.component.*            # Shell e layout
├── app.routes.ts              # Rotas principais
├── core/
│   └── services/hero.service.ts
├── features/
│   ├── heroes/
│   │   ├── hero-list/         # Lista e filtros
│   │   └── hero-create/       # Form de criação
│   └── battle/                # Tela de batalha
└── models/hero.ts             # Tipos e contratos
```

## 🔌 Integração com a API

A UI espera a API em `http://localhost:8080`. Endpoints utilizados:

- `POST /api/heroes` – criar herói
- `GET /api/heroes` – listar com filtros
- `GET /api/heroes/{id}` – obter herói por id
- `PUT /api/heroes/{id}/attack` – atacar herói

## ⚙️ Configuração e Execução

Pré-requisitos:
- Node.js 20+
- Backend rodando em `http://localhost:8080`

Instalação:
```bat
cd c:\Users\Erick\Documents\battle-challenge\heroes-battle-ui
npm install
```

Executar em desenvolvimento:
```bat
npm start
```

Build de produção:
```bat
npm run build
```

## 🌍 Ambiente

Arquivo opcional para apontar URLs e flags:
```
src\env\env.production.ts
```

Exemplo:
```ts
export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080'
};
```

## 🧭 Páginas

- Lista de Heróis
  - Filtros no card “Filtros”
  - Botão “Novo Herói”
  - Ação “Atacar” leva à batalha

- Criar Herói
  - Formulário com validação (nome, ataque, defesa, vida)
  - Botões “Cancelar” e “Cadastrar”

- Batalha
  - Mostra vida atual e barra de progresso
  - Campo “Valor do ataque” com previsão de dano e vida
  - Feedback por `p-toast`

## 🧪 Teste Manual

1. Suba a API (porta 8080)
2. Rode `npm start` para servir a UI (porta 4200)
3. Acesse `http://localhost:4200`
4. Cadastre um herói e teste filtros e ataque

## 📝 Commits Semânticos

Padrão recomendável (curtos, em inglês):
```
feat: add feature
fix: bug fix
refactor: code refactor
chore: tooling/config
docs: documentation
```

## 📦 Scripts

- `npm start` – serve dev
- `npm run build` – build prod
- `npm run lint` – lint do projeto (se configurado)

---

**Desenvolvido com ☕ e ❤️ - Erick Berdnaski**
