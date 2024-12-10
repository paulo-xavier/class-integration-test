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


    // books[id].name = book.name;
    // books[id].status = book.status;


    // Percorrer o Array para achar o registro que contenha o ID informado
    
    books.forEach(book => {
        
        if(book.id == id) {
            

            
        } else {

        }
    })


    res.status(201).json(books[id]);

})



// DELETE /books/:id

app.delete('/books/:id', (req, res) => {
    const id = req.params.id; 
    books.splice(id, 1);
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