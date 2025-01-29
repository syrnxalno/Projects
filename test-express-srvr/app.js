//fetching express and mongoose 
const express = require('express');
const mongoose = require('mongoose');
const readline = require('readline');
const bookEndpoints = require('./endpoints/bookEndpoints');
const Book = require('./models/bookModel');
require('dotenv').config();

const PORT = 3000;

// initializing xxpress app and copying it to a variable
const app = express();
app.use(express.json());
app.use('/api', bookEndpoints);

// mongoDB connectivity
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log('Database connection error:', error);
});

// waiting for database to connect before asking user input
database.once('connected', () => {
    console.log('Database Connected');
    startCLI(); // start
});


app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

//terminal input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startCLI() {
    console.log(`Sample Book Server
1. Add a new book (JSON format only)
2. View all books
3. Exit
`);
    rl.question('Enter your choice: ', async (choice) => {
        switch (choice) {
            case '1':
                console.log('Enter book details as JSON (e.g., {"title":"My Book","author":"Author Name","year":2023,"genre":"Fiction"}):');
                rl.question('> ', async (input) => {
                    try {
                        const bookData = JSON.parse(input);
                        await addBookCLI(bookData);
                    } catch (error) {
                        console.error('Invalid JSON format. Please try again.');
                        startCLI();
                    }
                });
                break;
            case '2':
                await viewBooksCLI();
                break;
            case '3':
                console.log('Exit Console');
                rl.close();
                break;
            default:
                console.log('Invalid choice, please try again.');
                startCLI();
        }
    });
}
//asynchronous functions for adding and viewing books
async function addBookCLI(bookData) {
    try {
        const newBook = new Book(bookData);
        const savedBook = await newBook.save();
        console.log('Book added successfully:', JSON.stringify(savedBook, null, 2));
    } catch (error) {
        console.error('Error adding book:', error.message);
    }
    startCLI();
}

async function viewBooksCLI() {
    try {
        const books = await Book.find();
        console.log('Books in the database:');
        console.log(JSON.stringify(books, null, 2));
    } catch (error) {
        console.error('Error fetching books:', error.message);
    }
    startCLI();
}
