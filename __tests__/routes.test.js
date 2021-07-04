'use strict';
require('@code-fellows/supergoose');
const supertest = require('supertest');
const base64 = require('base-64');
const server = require('../src/server');
const mockServer = supertest(server.app);

describe('route tests',()=>{
    it('tests signup',async ()=>{
        let user = { username: "dana", password: "2021998" }
        let test = await mockServer.post('/signup').send(user);

        expect(test.status).toEqual(201);
        expect(test.body.username).toEqual("dana");
    })
    it("tests sign in", async() => {

        let basicAuthVal = `Basic ${base64.encode("dana:2021998")}`
        let test = await mockServer.post('/signin').set({ Authorization: basicAuthVal });

        expect(test.body.user.username).toEqual('dana')
        expect(test.status).toEqual(200)
    });
})