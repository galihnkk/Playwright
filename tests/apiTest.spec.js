const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const ajv = new Ajv();

const getUserSchema = require('./json-schema/get-user.schema.json');
const createUserSchema = require('./json-schema/create-user.schema.json');
const updateUserSchema = require('./json-schema/update-user.schema.json');

test('GET Request', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/4');
    const resBody = await response.json();

    expect(response.status()).toEqual(200);
    expect(response.ok()).toBeTruthy();

    const valid = ajv.validate(getUserSchema, resBody);
    if (!valid) {
        console.error('AJV Validation Errors:', ajv.errorsText());
    }
    expect(valid).toBe(true);
});

test('POST Request', async ({ request }) => {
    const reqHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const body = {
        name: 'galih',
        job: 'student',
    };

    const response = await request.post('https://reqres.in/api/users', {
        headers: reqHeaders,
        data: body,
    });

    expect(response.status()).toEqual(201);
    expect(response.ok()).toBeTruthy();

    const resBody = await response.json();
    const valid = ajv.validate(createUserSchema, resBody);
    if (!valid) {
        console.error('AJV Validation Errors:', ajv.errorsText());
    }
    expect(valid).toBe(true);
});

test('PUT Request', async ({ request }) => {
    const reqHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    const body = {
        name: 'galih',
        job: 'freelance',
    };

    const response = await request.put('https://reqres.in/api/users/4', {
        headers: reqHeaders,
        data: body,
    });

    expect(response.status()).toEqual(200);
    expect(response.ok()).toBeTruthy();

    const resBody = await response.json();
    const valid = ajv.validate(updateUserSchema, resBody);
    if (!valid) {
        console.error('AJV Validation Errors:', ajv.errorsText());
    }
    expect(valid).toBe(true);
});

test('DELETE Request', async ({ request }) => {
    const response = await request.delete('https://reqres.in/api/users/4');
    
    expect(response.status()).toEqual(204);
    expect(response.ok()).toBeTruthy();
});
