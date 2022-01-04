const request = require("supertest");
const faker = require('faker');

const baseUrl = 'http://localhost:3000';

describe('assignment_5', () => {
    test('Server is responding', async () => {
        const response = await request(baseUrl)
			.get('/');

		expect(response.statusCode).toBeTruthy();
    });

    const user_one =  {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.datatype.string(10)
    }

    const user_two =  {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.datatype.string(10)
    }

    let user_one_jwt; let user_two_jwt; let user_one_post; let user_two_post;

    test('Register a User', async () => {
        let response = await request(baseUrl)
            .post('/register')
            .type('form')
            .send(user_one);

        expect(response.statusCode).toBe(200);

        response = await request(baseUrl)
            .post('/register')
            .type('form')
            .send(user_two);

        expect(response.statusCode).toBe(200);

        response = await request(baseUrl)
            .post('/register')
            .type('form')
            .send(user_one);

        expect(response.statusCode).toBeGreaterThan(200);
    });

    test('Login User', async () => {
        let response = await request(baseUrl)
            .post('/login')
            .type('form')
            .send(user_one);

        console.log(response.body);
        user_one_jwt = response.body.token;

        expect(response.statusCode).toBe(200);

        response = await request(baseUrl)
            .post('/login')
            .type('form')
            .send(user_two);

        user_two_jwt = response.body.token;

        expect(response.statusCode).toBe(200);
    })

    test('Get Posts', async () => {
        let response = await request(baseUrl)
            .get('/posts')
            .set('Authorization', `Bearer ${user_one_jwt}`);

        expect(response.body?.posts?.length).toBeGreaterThanOrEqual(0);

        response = await request(baseUrl)
            .get('/posts')
            .set('Authorization', `Bearer ${user_one_jwt}`);

        expect(response.body?.posts?.length).toBeGreaterThanOrEqual(0);

    });

    test('Create Post', async () => {
        let response = await request(baseUrl)
            .post('/posts')
            .type('form')
            .send({ name: faker.lorem.words(), body: faker.lorem.sentence(), image: faker.image.nature() })
            .set('Authorization', `Bearer ${user_one_jwt}`);

        user_one_post = response.body?.post?._id;
        expect(response.statusCode).toBe(200);

        response = await request(baseUrl)
            .post('/posts')
            .type('form')
            .send({ name: faker.lorem.words(), body: faker.lorem.sentence(), image: faker.image.nature() })
            .set('Authorization', `Bearer ${user_two_jwt}`);

        user_two_post = response.body?.post?._id;
        expect(response.statusCode).toBe(200);
    });

    test('Edit Post - Failed Case', async () => {
        let response = await request(baseUrl)
            .put(`/posts/${user_two_post}`)
            .type('form')
            .send({ name: faker.lorem.words(), body: faker.lorem.sentence(), image: faker.image.nature() })
            .set('Authorization', `Bearer ${user_one_jwt}`);

        expect(response.statusCode).toBeGreaterThan(200);
    });

    test('Edit Post - Success Case', async () => {
        let response = await request(baseUrl)
            .put(`/posts/${user_one_post}`)
            .type('form')
            .send({ name: faker.lorem.words() })
            .set('Authorization', `Bearer ${user_one_jwt}`);

        expect(response.statusCode).toBe(200);
    });

    test('Delete Post - Failed Case', async () => {
        let response = await request(baseUrl)
            .delete(`/posts/${user_two_post}`)
            .set('Authorization', `Bearer ${user_one_jwt}`);

        expect(response.statusCode).toBeGreaterThan(200);
    });

    test('Delete Post - Success Case', async () => {
        let response = await request(baseUrl)
            .delete(`/posts/${user_one_post}`)
            .set('Authorization', `Bearer ${user_one_jwt}`);

        expect(response.statusCode).toBe(200);
    });

});