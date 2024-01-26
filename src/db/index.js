const pgPromise = require('pg-promise');
const dbConfig = require('../../db-config.json');

const pgp = pgPromise();
const db = pgp(dbConfig)

const queryFile = require('./queryfile');

module.exports = { db, queryFile };