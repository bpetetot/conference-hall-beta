## Prerequisites

- Node / Npm
- Docker

## Getting started

**Start Postgresql, Firebase and Email Emulators with Docker:**

From the root folder:

```
docker compose up -d
```

- Auth emulator UI: http://localhost:4000/auth
- Storage emulator UI: http://localhost:4000/storage
- Email inbox UI: http://localhost:8025

**Install dependencies:**

```
npm ci
```

**Launch local server:**

```
npm run dev
```

Server running is on http://localhost:3000

_Needs `docker compose up -d` to run_

**Open SQL Prisma studio:**

```
npm run db:studio
```

Prisma studio is running on http://localhost:5555

**Execute tests:**

```
npm test
```

_Needs `docker compose up -d` to run_

## Database migrations

1. Make changes on the prisma schema in `/prisma/schema.prisma`.
2. Execute `npm run db:migrate`.
