# MyOnlyFun-api

The MyOnlyFun main API.

## Requirements

- NodeJS v16+
- Docker
- PostgreSQL (cf `docker-compose.yml`)

## Run API

Dev start the database with :

```sh
docker-compose up -d
```

Dev with hot-reloading:

```sh
npm run dev
```

Prod:

```sh
npm start
```

## Contribute

### Manage database with TypeORM

Delete schema:

```sh
npm run db:drop
```

Run all migrations:

```sh
npm run db:migrate
```

Reset db (combination of drop and migrate)

```sh
npm run db:reset
```

```sh
npm run typeorm migration:generate -- -n xxx
```

Create migration:

```sh
# After editing or adding an Entity
npm run typeorm migration:generate -- -n AddNewEntity
```

### Code Style

Available commands for eslint/prettier:

```sh
npm run lint:check
npm run lint:fix
npm run format:check
npm run format:fix
```
