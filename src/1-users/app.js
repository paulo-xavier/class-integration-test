const express = require('express');
const app = express(); // App is an server instance

app.use(express.json());  // Our server will accept the content type JSON

let users = []; //This is a simulation of our DB

app.post('/users', (req, res) => {
    const user = req.body;

    if(!user.name || !user.email) {
        return res.status(400).json({
            error: 'Name and email are required'
        })
    }

    user.id = users.length + 1;
    users.push(user);
    res.status(201).json(user);
})


app.get('/users', (req, res) => {
    res.json(users);
})

module.exports = { app, users }




// Status (201)  = Created status
// Status (200) = Success
