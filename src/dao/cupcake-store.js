const { db, queryFile: qf } = require('../db');

function addCupcake(cupcake) {
    return db.one(qf.insert, {
        name: cupcake.name,
        description: cupcake.description,
        price: cupcake.price,
        ingredients: cupcake.ingredients,
    });
}

function listCupcakes() {
    return db.any(qf.select_all);
}

function getCupcakeById(id) {
    return db.oneOrNone(qf.select, { id: id });
}

function updateCupcake(id, cupcake) {
    return getCupcakeById(id)
                .then(storedCupcake => {
                    Object.assign(storedCupcake, cupcake);
                    return storedCupcake;
                })
                .then(storedCupcake => db.oneOrNone(qf.update, {
                    id: id,
                    name: storedCupcake.name,
                    description: storedCupcake.description,
                    price: storedCupcake.price,
                    ingredients: storedCupcake.ingredients,
                }));
};

function deleteCupcake(id) {
    return db.oneOrNone(qf.delete, { id: id });
}

module.exports = {
    addCupcake,
    listCupcakes,
    getCupcakeById,
    updateCupcake,
    deleteCupcake
};