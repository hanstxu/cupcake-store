const express = require('express');
const request = require('supertest');
const sinon = require('sinon');
const assert = require('assert');

const cupcakeStore = require('../dao/cupcake-store');
const { ERRNO_CONNECTION_REFUSED, router } = require('./cupcake-store-router');

const app = express();
app.use(express.json());
app.use('/cupcake', router);

describe('Cupcake store router', () => {
    const cupcake = {
        id: 1,
        name: "strawberry cupcake",
        description: "description",
        price: 14.99,
        ingredients: [
            "strawberry",
            "cupcake"
        ]
    }
    
    const cupcakeList = [
        cupcake,
        {
            id: 2,
            name: "chocolate cupcake",
            price: 9.99
        }
    ];

    describe('POST /cupcake', () => {
        it("success", () => {
            sinon.stub(cupcakeStore, "addCupcake").returns(Promise.resolve(cupcake));

            request(app).post('/cupcake')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({
                            name: "strawberry cupcake",
                            description: "description",
                            price: 14.99,
                            ingredients: [
                                "strawberry",
                                "cupcake"
                            ]
                        })
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 200);
                            assert.deepEqual(res.body, cupcake);
                        });
        });

        it("invalid input", () => {
            request(app).post('/cupcake')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({
                            name: "strawberry cupcake"
                        })
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 405);
                            assert.deepEqual(res.text, "Invalid input");
                        });
        })
    });

    describe('GET /cupcake', () => {
        it("success", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "listCupcakes").returns(Promise.resolve(cupcakeList));

            request(app).get('/cupcake/')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 200);
                            assert.deepEqual(res.body, cupcakeList);
                        });
        });
    });

    describe('GET /cupcake/:id', () => {
        it("success", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "getCupcakeById").returns(Promise.resolve(cupcake));

            request(app).get('/cupcake/1')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 200);
                            assert.deepEqual(res.body, cupcake);
                        });
        });

        it("invalid id", () => {
            request(app).get('/cupcake/abc')
            .end(function(err, res) {
                assert.deepEqual(res.status, 400);
                assert.deepEqual(res.text, "Invalid ID supplied");
            });
        });

        it("not found", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "getCupcakeById").returns(Promise.resolve(null));

            request(app).get('/cupcake/3')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 404);
                            assert.deepEqual(res.text, "Cupcake not found");
                        });
        });
    });

    describe('PUT /cupcake/:id', () => {
        it("success", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "updateCupcake").returns(Promise.resolve(cupcake));

            request(app).put('/cupcake/1')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({
                            name: "strawberry cupcake",
                            description: "description",
                            price: 14.99,
                            ingredients: [
                                "strawberry",
                                "cupcake"
                            ]
                        })
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 200);
                            assert.deepEqual(res.body, cupcake);
                        });
        });

        it("invalid id", () => {
            request(app).put('/cupcake/abc')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({
                            name: "strawberry cupcake",
                            description: "description",
                            price: 14.99,
                            ingredients: [
                                "strawberry",
                                "cupcake"
                            ]
                        })
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 400);
                            assert.deepEqual(res.text, "Invalid ID supplied");
                        });
        });

        it("validation exception", () => {
            request(app).put('/cupcake/1')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({
                            name: "strawberry cupcake",
                        })
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 405);
                            assert.deepEqual(res.text, "Validation exception");
                        });
        });

        it("not found", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "updateCupcake").returns(Promise.resolve(null));

            request(app).put('/cupcake/3')
                        .set('Content-Type', 'application/json')
                        .set('Accept', 'application/json')
                        .send({
                            name: "strawberry cupcake",
                            description: "description",
                            price: 14.99,
                            ingredients: [
                                "strawberry",
                                "cupcake"
                            ]
                        })
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 404);
                            assert.deepEqual(res.text, "Cupcake not found");
                        });
        });
    });

    describe('DELETE /cupcake/:id', () => {
        it("success", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "deleteCupcake").returns(Promise.resolve(cupcake));

            request(app).del('/cupcake/1')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 200);
                            assert.deepEqual(res.body, cupcake);
                        });
        });

        it("invalid id", () => {
            request(app).del('/cupcake/abc')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 400);
                            assert.deepEqual(res.text, "Invalid ID supplied");
                        });
        });

        it("not found", () => {
            sinon.restore();
            sinon.stub(cupcakeStore, "deleteCupcake").returns(Promise.resolve(null));

            request(app).del('/cupcake/3')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 404);
                            assert.deepEqual(res.text, "Cupcake not found");
                        });
        });
    });

    describe('Runtime exceptions', () => {
        

        it('database down', () => {
            sinon.restore();
            sinon.stub(console, 'error'); // suppress console error log in test

            const fakeError = new Error("database error");
            fakeError.errno = ERRNO_CONNECTION_REFUSED;
            sinon.stub(cupcakeStore, "listCupcakes").returns(Promise.reject(fakeError));

            request(app).get('/cupcake/')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 503);
                            assert.deepEqual(res.text, "Database is down");
                        });
        });

        it('unknown error', () => {
            sinon.restore();
            sinon.stub(console, 'error'); // suppress console error log in test

            sinon.stub(cupcakeStore, "listCupcakes").returns(Promise.reject(new Error("Unknown error")));

            request(app).get('/cupcake/')
                        .end(function(err, res) {
                            assert.deepEqual(res.status, 500);
                            assert.deepEqual(res.text, "Internal server error");
                        });
        });
    });
})
