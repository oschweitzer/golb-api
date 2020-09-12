# golb-api

Node.js &amp; GraphQL API for a blog application.

## Dependencies

- [Node.js](https://nodejs.org/en/) version 14.10.1
- [Babel](https://babeljs.io/) for handling ES6 module syntax in Node.js
- [Prisma](https://www.prisma.io/) for handling communication with the database (Postgres).
- [GraphQL](https://graphql.org/) through [Apollo Server Express](https://www.apollographql.com/docs/apollo-server/v1/servers/express/)



## Prerequisites

- Install Node.js using [NVM](https://github.com/nvm-sh/nvm)
- Install [Docker CE](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose
/install/) (It is recommended to use a Linux distributions OS)

## Usage

- `npm i`
- `docker-compose up -d`
- `cd src/schemas/Prisma`
- `npx prisma migrate save --experimental`
- `npx prisma migrate up --experimental`
- `cd ../../..`
- `npx prisma generate --schema ./src/schemas/Prisma/schema.prisma`
- `npm run start:dev`
- Open http://localhost:3000/graphql and start sending GraphQL queries !
