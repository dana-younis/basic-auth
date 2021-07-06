'use strict';

require('dotenv').config();
const base64 = require('base-64');

const supergoose = require('@code-fellows/supergoose');
const app = require('../app.js');
const request = supergoose(app.app);
const auth = require('../src/auth/auth-basic');


describe('Basic Auth', () => {
    it('POST sign up', async () => {
        const user = {
            username: 'dana',
            password: '12345',
        };
        const response = await request.post('/signup').send(user);
        expect(response.status).toEqual(201);
        expect(response.body.username).toEqual('dana');
    });
    it('POST signin', async () => {
        let user = base64.encode('dana:12345');
        let response = await request.post('/signin').set(`Authorization`, `Basic ${user}`);
        expect(response.status).toEqual(200);
        expect('dana').toEqual('dana');
    });
    describe('test middleware', () => {
        it('Basic Header', async () => {
            let user = base64.encode('dana:12345');
            let response = await request.post('/signin').set(`Authorization`, `Basic ${user}`);
            expect(response.status).toEqual(200);
            expect(response.body).toBeTruthy();
        });
        it('The route assert requirement', async () => {
            const response = await request.post('/');
            expect(response.status).toBe(404);
        });
    });
});