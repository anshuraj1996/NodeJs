const request = require("supertest");
const path = require('path');
const ejs = require('ejs');

const baseUrl = 'http://localhost:3000';

describe('assignment_3', () => {
    test('Server is responding', async () => {
        const response = await request(baseUrl)
			.get('/');

		expect(response.statusCode).toBe(200);
    });

    test('Check form', async () => {
        const response = await request(baseUrl)
            .get('/form');

        ejs.renderFile(path.join(__dirname, '..', 'assignments', 'assignment_3', 'views', 'form.ejs'), {}, {}, function(err, str){
            expect(response.text).toEqual(str);
        });
    });

    test('Add User', async () => {
        const response = await request(baseUrl)
            .post('/user/add')
            .type('form')
            .send({
                name: 'john',
                email: 'john.doe@gmail.com'
            });

        const userAddedResponse = await request(baseUrl)
            .get('/');

        console.log(userAddedResponse);
        expect(userAddedResponse.text.includes('john.doe@gmail.com')).toBe(true);
    })
});