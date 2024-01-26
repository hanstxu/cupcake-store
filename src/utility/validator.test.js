const validator = require('./validator');
const assert = require('assert');

describe('validator', () => {
    describe('validateId', () => {
        it('invalid ids', () => {
            const failMessage = id => `${id} should be invalid`;

            assert.equal(validator.validateId("abc"), false, failMessage("abc"));
            assert.equal(validator.validateId("123abc"), false, failMessage("123abc"));
            assert.equal(validator.validateId("1-23"), false, failMessage("1-23"));
            assert.equal(validator.validateId("1 3"), false, failMessage("1 3"));
            assert.equal(validator.validateId("1.3"), false, failMessage("1.3"));
            assert.equal(validator.validateId("13.00"), false, failMessage("13.00"));
            assert.equal(validator.validateId("13."), false, failMessage("13."));
        });

        it('valid ids', () => {
            const failMessage = id => `${id} should be valid`;

            assert.ok(validator.validateId("123"), failMessage("123"));
            assert.ok(validator.validateId("-123"), failMessage("-123"));
            assert.ok(validator.validateId("0123"), failMessage("0123"));
        });
    });

    describe('validateCupcake', () => {
        it('valid cupcake', () => {
            const cupcake = {
                id: 3,
                name: "strawberry cupcake",
                description: "description",
                price: 14.99,
                ingredients: [
                    "strawberry",
                    "milk",
                    "flour",
                    "eggs",
                    "sugar",
                    "butter",
                    "baking powder",
                    "baking soda"
                ]
            }

            assert.ok(validator.validateCupcake(cupcake));
        });

        it('valid cupcake with minimal fields', () => {
            const cupcake = {
                name: "strawberry cupcake",
                price: 14.99
            };

            assert.ok(validator.validateCupcake(cupcake));
        });

        it('invalid cupcake with no name', () => {
            const cupcake = {
                price: 14.99
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });

        it('invalid cupcake with no price', () => {
            const cupcake = {
                name: "strawberry cupcake",
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });

        it('invalid cupcake with mistyped id', () => {
            const cupcake = {
                id: "asd",
                name: "strawberry cupcake",
                price: 14.99
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });

        it('invalid cupcake with mistyped name', () => {
            const cupcake = {
                name: 123,
                price: 14.99
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });

        it('invalid cupcake with mistyped description', () => {
            const cupcake = {
                name: "strawberry cupcake",
                description: 1234,
                price: "priceless"
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });

        it('invalid cupcake with mistyped price', () => {
            const cupcake = {
                name: "strawberry cupcake",
                price: "priceless"
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });

        it('invalid cupcake with mistyped ingredients', () => {
            const cupcake = {
                name: "strawberry cupcake",
                price: "priceless",
                ingredients: [
                    123,
                    "food"
                ]
            };

            assert.equal(validator.validateCupcake(cupcake), false);
        });
    })
});