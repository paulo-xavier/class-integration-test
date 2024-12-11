const express = require('express'); 
const app = express(); 

app.use(express.json());

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

    if(book.status != 'available'){
        return res.status(400).json({
            error: 'When you add a book it must start with the available status'
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
    
    let bookFound = false; 

    books.forEach(reg => {
        if(reg.id == id) {
            reg.name = book.name;
            reg.status = book.status;
            bookFound = true;
        }
    });

    if (bookFound) {
        let book = books.find(reg => reg.id == id);
        return res.status(201).json(book)

    } else {
        res.status(400).json({
            error: 'Book not found!'
        })
    }
    

})



// DELETE /books/:id

app.delete('/books/:id', (req, res) => {
    
    const id = req.params.id; 

    let bookIndex = books.findIndex(reg => reg.id == id);

    if(bookIndex != -1) {
        let removedBook = books.splice(bookIndex, 1)[0];
        
        return res.status(201).json(removedBook);
    
    } else {
        return res.status(400).json({
            error: 'Book not found'
        })
    }

});


// POST /loans 

app.post('/books/loans/:id', (req, res) => {
    const id = req.params.id;

    books[id].status = 'lent';
});




// POST
app.post('/books/return/:id', (req, res) => {
    const id = req.params.id;

    books[id].status = 'available';
});


module.exports = { app, books };