# Nest Application

## Description
Implement RESTful API with Prisma

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Architecture
`app.module.ts` is the root module for this application and we can import the other modules through this root, so the implementation is much `cleaner` and `clear`.

Folder Structure under `src` folder:
```
.
├─ main.ts
├─ app.module.ts
└─ user
   ├─ user.module.ts
   ├─ user.controller.spec.ts
   ├─ user.controller.ts
   ├─ user.service.spec.ts
   └─ user.service.ts
```

## Database

### User Model
|    Name   |    Type   | Allow Null | Default |
|:---------:|:---------:|:----------:|:-------:|
|     id    |    UUID   |    false   |   UUID  |
|    name   |   string  |    false   |         |
|   email   |   string  |    false   |         |
|  password |   string  |    false   |         |
| createdAt | timestamp |    true    |  now()  |
| updatedAt | timestamp |    true    |  now()  |

### Migrate Database
To migrate the schema into the database, you can run command:
```bash
$ npx prisma migrate dev
```