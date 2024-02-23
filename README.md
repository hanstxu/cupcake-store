# Cupcake store

A crud app for a simple cupcake store in the node js ecosystem; this was a take-home challenge for 8flow.ai

## Dependencies

- [Nodejs](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Postgres](https://www.postgresql.org/) (contained within docker)

### npm packages

- [express](https://www.npmjs.com/package/express) - minimal web framework
- [ajv](https://www.npmjs.com/package/ajv) - json validator
- [pg-promise](https://www.npmjs.com/package/pg-promise) - postgres client
- [mocha](https://www.npmjs.com/package/mocha) - test framework
- [sinon](https://www.npmjs.com/package/sinon) - stubs and mocking
- [supertest](https://www.npmjs.com/package/supertest) - http integration testing

## How to run

### Quick start
1. Create and start the postgres docker database
```bash
cd <ROOT-DIRECTORY-OF-REPO>
docker-compose up -d
```

2. Start the node server
```bash
cd <ROOT-DIRECTORY-OF-REPO>
npm install
npm start
```

### Run https server

1. Start the server
```bash
cd <ROOT-DIRECTORY-OF-REPO>
npm run https
```

### Database down

In case there are errors from the api server that the database is down, just use docker to restart the container:
```bash
docker start postgres-db
```

Or if the docker container was removed, just create the postgres docker database again using docker compose

## Testing

### Run tests

1. Run all tests
```bash
cd <ROOT-DIRECTORY-OF-REPO>
npm test
```

2. Run validator tests
```bash
cd <ROOT-DIRECTORY-OF-REPO>
npm run test:validator
```

3. Run route tests
```bash
cd <ROOT-DIRECTORY-OF-REPO>
npm run test:route
```

### Local testing

The `bin/examples.sh` file has example curl commands to use on the server.
