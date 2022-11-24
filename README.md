## Description

Rota com Swagger http://localhost:3000/api

## Installation

```bash
Instalação das dependências
$ npm install

alterar nome .env.exemplo para .env e editar dados

Iniciar doker-componse com postgres:
docker-compose up -d


Migrar banco de dados com prisma:
npx prisma migrate dev --name init
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```
