let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    Title: String,
    Description: String,
    Author: String,
    Genre: String
},
{
  collection: "survey"
});

module.exports = mongoose.model('Survey', Survey);
