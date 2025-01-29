//configuring express router to create a module for 'get' and 'post'
const express = require('express');
const router = express.Router();
const bookModel = require('../models/bookModel');
module.exports = router;

//post Method for books
router.post('/post', async (req, res) => {
    const data = new Model({
        title: req.body.title,
        author: req.body.author,
        year : req.body.year,
        genre : req.body.genre
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

// get method for books
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})