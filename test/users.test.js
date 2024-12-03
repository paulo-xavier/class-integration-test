const request = require('supertest');
const { app, users } = require('../src/1-users/app');



describe('Users API', () => {
    
    beforeEach(() => {
        users.length = 0; // Clear the users array before each test
    });

    it('Must sucessfully add a new user', async() => { // "it" is the same as "test"
        const newUser = { name: 'John Doe', email: 'john@example.com'}

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /json/)

        expect(response.body).toMatchObject(newUser);
        expect(response.body).toHaveProperty('id', 1);
        expect(users).toHaveLength(1);
    });


    it('Must return an error when try to add a user without name', async() => {
        const newUser = { email: 'john@example.com'};

        const response = await request(app)
            .post('/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /json/)

        expect(response.body).toEqual({ error: 'Name and email are required'});
        expect(users).toHaveLength(0);
    })

    it('Must list the registered users', async() => {
        users.push({id: 1, name: 'John Doe', email: 'john@example.com'})

        const response = await request(app)
            .get('/users')
            .expect(200)
            .expect('Content-Type', /json/)

        
        expect(response.body).toHaveLength(1);
        expect(response.body[0]).toMatchObject({name:'John Doe', email: 'john@example.com'});
        
    })
})