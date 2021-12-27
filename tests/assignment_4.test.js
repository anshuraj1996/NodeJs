const request = require("supertest");
const path = require('path');
const ejs = require('ejs');
const faker = require('faker');

const baseUrl = 'http://localhost:3000';

describe('assignment_4', () => {
    test('Server is responding', async () => {
        const response = await request(baseUrl)
			.get('/');

		expect(response.statusCode).toBe(200);
    });

    test('Check form', async () => {
        const response = await request(baseUrl)
            .get('/form');

        ejs.renderFile(path.join(__dirname, '..', 'assignments', 'assignment_4', 'views', 'form.ejs'), {}, {}, function(err, str){
            expect(response.text).toEqual(str);
        });
    });

    test('Add / Edit / Delete User', async () => {
        const name = faker.name.firstName();
        const email = faker.internet.email();
        await request(baseUrl)
            .post('/users/add')
            .type('form')
            .send({
                name,
                email,
                isPromoted: true
            });

        const userAddedResponse = await request(baseUrl)
            .get('/');

        expect(userAddedResponse.text.includes(`${email}`)).toBe(true);

        document.body.innerHTML = userAddedResponse.text;
        
        const userEditBtn = document.querySelector(`#edit-${name}`);

        const id = userEditBtn.parentElement.getAttribute('action').split('users/')[1];

        await request(baseUrl).delete('/users/' + id);

        const userDeleteResponse = await request(baseUrl)
            .get('/');

        expect(userDeleteResponse.text.includes(`${email}`)).toBe(false)
    });
});