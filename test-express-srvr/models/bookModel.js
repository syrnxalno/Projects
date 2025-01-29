const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    //schema design
    title: {
        type: String,
        //field cannot be left empty
        required: true, 
        trim: true 
    },
    author: {
        type: String,
        required: true, 
        trim: true
    },
    year: {
        type: Number,
        required: true, 
        min: 500, //minimum year input = 500
        max: new Date().getFullYear() //to avoid future dates
    },
    genre: {
        type: String,
        required: true, 
        trim: true
    }
});
module.exports = mongoose.model('Data', bookSchema);
