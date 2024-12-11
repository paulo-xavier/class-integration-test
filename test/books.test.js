const request = require('supertest');
const { app, books } = require('../src/2-books/app');



// bookId, bookName, bookStatus

describe('Books API', () => {

    beforeEach(() => {
        books.length = 0; // Clear the users array before each test
    })


    it('Adding a new book with valid data', async() => {
        const newBook = {name: 'Pride and Prejudice', status: 'available'}

        const response = await request(app)
            .post('/books')
            .send(newBook)
            .expect(201)
            .expect('Content-Type', /json/)

            expect(response.body).toMatchObject(newBook);
            expect(response.body).toHaveProperty('id', 1);
            expect(books).toHaveLength(1);
    })

    it('Must return an error when try to add a book without completed info', async() => {

        const newBook = { name: 'Pride and Prejudice'};

        const response = await request(app)
            .post('/books')
            .send(newBook)
            .expect(400)
            .expect('Content-Type', /json/)


        expect(response.body).toEqual({ error: 'Book and status are required!'});
        expect(books).toHaveLength(0);

    })


    it('Must return an when you try to add a book with invalid data', async() => {
        const newBook = { name: 'Price and Prejudice', status: 'Invalid status'};

        const response = await request(app) 
            .post('/books')
            .send(newBook)
            .expect(400)
            .expect('Content-Type', /json/)

            expect(response.body).toEqual({ error: 'When you add a book it must start with the available status' });
            expect(books).toHaveLength(0);
    })


    it('Must return the list of all books', async() => {
        books.push({
            id: 1,
            name: 'Price and Prejudice',
            status: 'available'
        })

        const response = await request(app)
            .get('/books')
            .expect(200)
            .expect('Content-Type', /json/)

        expect(response.body).toHaveLength(1)
        expect(response.body[0]).toMatchObject({name: 'Price and Prejudice', status: 'available'})
    })


    it('Update the information of an existing book', async() => {
        books.push({
            id: 1,
            name: 'Pride and Prejudice',
            status: 'available'
        })

        const id = 1;
        const updatedBook = { name: 'Before you', status: 'lent'}

        const response = await request(app)
            .put(`/books/${id}`)
            .send(updatedBook)
            .expect(201)
            .expect('Content-Type', /json/)

        expect(response.body).toMatchObject(updatedBook);
        expect(books).toHaveLength(1); 
        expect(response.body).toHaveProperty('id', 1);
        expect(books.find(book => book.id === id)).toMatchObject(updatedBook)

    })


    it('Removing a book and certifying that it does not exist', async() => {

        books.push({
            id: 1,
            name: 'Pride and Prejudice',
            status: 'available'
        })

        const id = 1;

        const response = await request(app)
            .delete('/books/:id')
            .expect(201)
            .expect('Content-Type', /json/)

            expect(books).toHaveLength(0);


    })
        
    
})
