## Prerequisites

- Node / Npm
- Docker

## Getting started

**Install dependencies:**

```
npm ci
```

**Start postgresql database and Firebase auth emulator with Docker:**

Firebase auth UI is running on http://localhost:4000/auth
```
docker-compose up -d
```

**Launch local server:**

Server running is on http://localhost:3000
```
npm run dev
```
_Needs `docker-compose up -d` to run_

**Open SQL Prisma studio:**

Prisma studio is running on http://localhost:5555
```
npm run dev:studio
```

**Execute tests:**

```
npm test
```
_Needs `docker-compose up -d` to run_

## Database migrations

1. Make changes on the prisma schema in `/prisma/schema.prisma`.
2. Execute `npm dev:migrate --name <migration-name>`.
3. Run `npm prisma:generate` to build the prisma client.

