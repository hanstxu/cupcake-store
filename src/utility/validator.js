const Ajv = require("ajv");
const ajv = new Ajv();

/**
 * @param {string} id 
 * @returns returns whether the provided id is an integer
 */
function validateId(id) {
  return /^-?\d+$/.test(id);
};

const cupcakeSchema = {
  type: "object",
  properties: {
    id: {type: "integer"},
    name: {type: "string"},
    description: {type: "string"},
    price: {type: "number"},
    ingredients: {
      type: "array",
      items: {type: "string"},
    },
  },
  required: [
    "name",
    "price",
  ],
  additionalProperties: false,
};
const cupcakeValidate = ajv.compile(cupcakeSchema);

/**
 * @param {object} cupcake 
 * @returns whether the provided object matches the cupcake schema
 */
function validateCupcake(cupcake) {
  return cupcakeValidate(cupcake);
};

module.exports = {
  validateId,
  validateCupcake
}