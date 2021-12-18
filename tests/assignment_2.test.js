const request = require("supertest");
const fs = require('fs');
const path = require('path');

const baseUrl = 'http://localhost:3000';

describe('assignment_2', () => {
    test('Check if file is created', () => {
        const fileExists = fs.existsSync(path.join(__dirname, '..', 'assignments', 'assignment_2', 'index.html'));
        expect(fileExists).toBe(true);
    })
    
    test('Server is responding', async () => {
        const response = await request(baseUrl)
			.get('/');

		expect(response.statusCode).toBe(200);
    })
})