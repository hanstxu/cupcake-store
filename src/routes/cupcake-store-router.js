const express = require('express');
const router = express.Router();

const validator = require('../utility/validator')
const cupcakeStore = require('../dao/cupcake-store');

const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const METHOD_NOT_ALLLOWED_CODE = 405;
const INTERNAL_SERVER_ERROR_CODE = 500;
const SERVICE_UNAVAILABLE_CODE = 503;

const ERRNO_CONNECTION_REFUSED = -111;

const filterNull = obj => {
    if (obj == null || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }

    return Object.fromEntries(
        Object.entries(obj)
              .filter(([_, v]) => v != null)
    );
};

const handleNotFoundCupcake = (cupcake, res) => {
    if (cupcake === null) {
        res.status(NOT_FOUND_CODE).send("Cupcake not found");

    } else {
        res.send(cupcake)
    }
}

const handleRuntimeExceptions = (res, err) => {
    if (err.errno === ERRNO_CONNECTION_REFUSED) {
        console.error("Database is down; please start a database");
        res.status(SERVICE_UNAVAILABLE_CODE).send("Database is down");

    } else {
        console.error(err);
        res.status(INTERNAL_SERVER_ERROR_CODE).send("Internal server error");
    }
};

router.post('/', function (req, res) {
    let cupcake = req.body;
    if (!validator.validateCupcake(cupcake)) {
        res.status(METHOD_NOT_ALLLOWED_CODE).send("Invalid input");

    } else {
        cupcakeStore.addCupcake(cupcake)
                    .then(cupcake => filterNull(cupcake))
                    .then(cupcake => { res.send(cupcake) })
                    .catch(err => handleRuntimeExceptions(res, err));
    }
});

router.get('/', function (req, res) {
    cupcakeStore.listCupcakes()
                .then(cupcakes => cupcakes.map(cupcake => filterNull(cupcake)))
                .then(cupcakes => res.send(cupcakes))
                .catch(err => handleRuntimeExceptions(res, err));
});

router.get('/:id', function (req, res) {
    let id = req.params.id;
    if (!validator.validateId(id)) {
        res.status(BAD_REQUEST_CODE).send("Invalid ID supplied");

    } else {
        cupcakeStore.getCupcakeById(id)
                    .then(cupcake => filterNull(cupcake))
                    .then(cupcake => handleNotFoundCupcake(cupcake, res))
                    .catch(err => handleRuntimeExceptions(res, err));
    }
});

router.put('/:id', function (req, res) {
    let id = req.params.id;
    let cupcake = req.body;

    if (!validator.validateId(id)) {
        res.status(BAD_REQUEST_CODE).send("Invalid ID supplied");

    } else if (!validator.validateCupcake(cupcake)) {
        res.status(METHOD_NOT_ALLLOWED_CODE).send("Validation exception");

    } else {
        cupcakeStore.updateCupcake(id, cupcake)
                    .then(cupcake => filterNull(cupcake))
                    .then(cupcake => handleNotFoundCupcake(cupcake, res))
                    .catch(err => handleRuntimeExceptions(res, err));;
    }
});

router.delete('/:id', function (req, res) {
    let id = req.params.id;
    if (!validator.validateId(id)) {
        res.status(BAD_REQUEST_CODE).send("Invalid ID supplied");

    } else {
        cupcakeStore.deleteCupcake(id)
                    .then(cupcake => filterNull(cupcake))
                    .then(cupcake => handleNotFoundCupcake(cupcake, res))
                    .catch(err => handleRuntimeExceptions(res, err));
    }
});

module.exports = { 
    ERRNO_CONNECTION_REFUSED,
    router
};
