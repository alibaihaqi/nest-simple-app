# Nest Application

## Description
Implement RESTful API with Prisma

## Installation

```bash
$ yarn install
```

## Migrate Prisma Migrations
```bash
$ npx prisma migrate dev
```

## Prisma Studio
You can also use Prisma GUI by exec the command.

```bash
$ npx prisma studio
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
└─ prisma
   ├─ prisma.module.ts
   └─ prisma.service.ts
└─ session
   ├─ session.module.ts
   ├─ session.controller.ts
   └─ session.service.ts
└─ users
   └─ dto
      ├─ index.ts
      └─ user.dto.ts
   └─ strategy
      ├─ index.ts
      └─ jwt.strategy.ts
   ├─ users.module.ts
   ├─ users.controller.spec.ts
   ├─ users.controller.ts
   ├─ users.service.spec.ts
   └─ users.service.ts
```

## Database

### User Model
|    Name   |       Type      | Allow Null | Default |
|:---------:|:---------------:|:----------:|:-------:|
|     id    |       UUID      |    false   |   UUID  |
|    name   |      string     |    false   |         |
|   email   | string + unique |    false   |         |
|  password |      string     |    false   |         |
| createdAt |    timestamp    |    true    |  now()  |
| updatedAt |    timestamp    |    true    |  now()  |

### Migrate Database
To migrate the schema into the database, you can run command:
```bash
$ npx prisma migrate dev
```

## Available Routes

|       Name       | Path       |
|:----------------:|------------|
| Generate Session | /session   |
|  Get User By ID  | /users/:id |
|    Insert User   | /users     |
|    Update User   | /users     |
|    Delete User   | /users/:id |

### Generate Session

#### Path
```
/session
```

#### Request
- Empty

#### Response

|   Response  | Type   |
|:-----------:|--------|
| accessToken | string |

```json
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTU3NTU5NjEsImV4cCI6MTY5NTc1Njg2MX0.5v-4JX8_dV3-sdLHQG0NLiWaWyBAkycRCRX1VfexBX4"
}
```

### Get User By ID

#### Path
```
GET /users/:id
```

#### Request
| Params | Type   |
|:------:|--------|
|   id   | string |

#### Response

| Response |  Type  |
|:--------:|:------:|
|    id    | string |
|   name   | string |
|   email  | string |
| password | string |

```json
{
   "id": "1aaa99b1-b27c-47a5-89a4-d9fe342ac9cf",
   "name": "sample",
   "email": "sample@mail.com",
   "password": "$argon2id$v=19$m=65536,t=3,p=4$4+p1eDUwLIVbxly5LEDJEg$IjipJMu1c6TIu/H7DrUDGMXYN1Y5mfP19ZU8ZDvQBf8"
}
```

### Insert User

#### Path
```
POST /users
```

#### Request
| Response |  Type  |
|:--------:|:------:|
|    id    | string |
|   name   | string |
|   email  | string |
| password | string |

```json
{
    "name": "sample",
    "email": "sample@mail.com",
    "password": "123456"
}
```

#### Response

| Response |  Type  |
|:--------:|:------:|
|    id    | string |
|   name   | string |
|   email  | string |
| password | string |

```json
{
   "id": "1aaa99b1-b27c-47a5-89a4-d9fe342ac9cf",
   "name": "sample",
   "email": "sample@mail.com",
   "password": "$argon2id$v=19$m=65536,t=3,p=4$4+p1eDUwLIVbxly5LEDJEg$IjipJMu1c6TIu/H7DrUDGMXYN1Y5mfP19ZU8ZDvQBf8"
}
```

### Update User

#### Path
```
PUT /users/:id
```

#### Request
|     Request     |  Type  | Is Optional |
|:---------------:|:------:|:-----------:|
|       name      | string |     true    |
| currentPassword | string |     true    |
|   newPassword   | string |     true    |

```json
{
    "id": "1aaa99b1-b27c-47a5-89a4-d9fe342ac9cf",
    "name": "sample1",
    "currentPassword": "123456",
    "newPassword": "12345678"
}
```

#### Response

| Response |  Type  |
|:--------:|:------:|
|    id    | string |
|   name   | string |
|   email  | string |
| password | string |

```json
{
   "id": "1aaa99b1-b27c-47a5-89a4-d9fe342ac9cf",
   "name": "sample1",
   "email": "sample@mail.com",
   "password": "$argon2id$v=19$m=65536,t=3,p=4$4+p1eDUwLIVbxly5LEDJEg$IjipJMu1c6TIu/H7DrUDGMXYN1Y5mfP19ZU8ZDvQBf8"
}
```

### Delete User

#### Path
```
DELETE /users/:id
```

#### Request
| Params | Type   |
|:------:|--------|
|   id   | string |

#### Response

| Response |   Type  |
|:--------:|:-------:|
|  success | boolean |
|  message |  string |

```json
{
   "success": true,
   "message": "Success delete user with ID 1aaa99b1-b27c-47a5-89a4-d9fe342ac9cf"
}
```

## Architecture
Implementation with `NestJS` + `Prisma` are much easier to do, and it really great integration between the frameworks. It's already use `TypeScript` in the first place and well documented. NestJS also can be use on the top of `ExpressJS` or `Fastify` that really great.

- `main.ts` is mainly work as a runner + you can also combine with `ValidationPipe` or other combinations for example `logging` or else.
- `App.module.ts` as the main module, the implementation is as collection of a lot of other modules
- For feature folder, it usually contains 3 parts, `Module`, `Controllers`, and `Service`
   - `Module` has a role for collection of `Controllers` and `Service`
   - `Controller` has a role for feature logic where the overall flow, collection of steps and combination with `Services`
   - `Services` has a role for main logic of the feature business, it'd be better if the logic is independent, so you can reuse the functionality if it has similar behavior.
- `prisma` only contains 2 files, `module` and `service`, where:
   - `module` has similar functionality with feature, and it uses `@Global` decorator, so it can be used in `Global` state.
   - `service` has functionality extends from `Prisma Client`
