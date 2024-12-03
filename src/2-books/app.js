const express = require('express'); 
const app = express(); 

let books = [];
// bookId, bookName, bookStatus


// POST /books
app.post('/books', (req, res) => {
    const book = req.body;

    if (!book.name || !book.status) {
        return res.status(400).json({
            error: 'Book and status are required!'
        })
    }

    book.id = books.length + 1;
    books.push(book);
    res.status(201).json(book);

}); 



// GET /books
app.get('/books', (req, res) => {
    res.json(books);
});



// PUT /books/:id
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const book = req.body;

    if (!book.name || !book.status) {
        return res.status(400).json({
            error: 'Book and status are required!'
        })
    }

    books[id].name = book.name;
    books[id].status = book.status;
    res.status(201).json(book);

})


