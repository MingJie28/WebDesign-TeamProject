let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    Title: String,
    Description: String,
    Author: String,
},
{
  collection: "survey"
});

module.exports = mongoose.model('survey', Survey);
