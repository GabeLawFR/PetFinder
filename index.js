// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

// to make sure styles.css is usable
app.use(express.static('public'));

const PORT = 8000;

// Declare that the landing page '/' will send the file/display the html file called "index" on localhost:####/
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database  by declaring that localhost:####/api/v1/pets will display the content of the variable 'pets' on which is stored the content of 'data.js' which the array of the different dogs object. landing on http://localhost:####/api/v1/pets should display the array to the user
app.get('/api/v1/pets', (req, res) => {
    res.send(pets);
});

// Same thing as the previous function but this time by specifying the pet's owner's name stored in the pets object array as a query by using .find to match the requested owner name with the correct one in the dog array /owner?owner=""
app.get('/api/v1/pets/owner', (req, res) => {
    const { owner } = req.query; 
    const pet = pets.find(pet => pet.owner === owner);
    res.send(pet);
});

// Same as previous function but this time using the pet's name as a parameter to GET and display matching dog /pets/"name of pet" by using .find as well to match params name with corresponding data.js one
app.get('/api/v1/pets/:name', (req, res) => {
    const { name } = req.params;
    const pet = pets.find(pet => pet.name === name);
    res.send(pet);
});

// Using pet's "id" as a query to GET and display matching dog /pets-query?id="" using .find and parseInt to match query id with corresponding data.js one
app.get('/api/v1/pets-query', (req, res) => {
    const { id } = req.query;
    const pet = pets.find(pet => pet.id === parseInt(id));
    res.send(pet);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;