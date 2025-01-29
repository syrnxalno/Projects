const Book = require('../models/bookModel');

// add a new book logic part
exports.addBook = async (req, res) => {
    try {
        const { title, author, year, genre } = req.body;
        // create a new book with these fields
        const book = new Book({ title, author, year, genre });
        await book.save();

        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        res.status(500).json({ error: 'Error adding book', details: error.message });
    }
};

// retrieve all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books', details: error.message });
    }
};
