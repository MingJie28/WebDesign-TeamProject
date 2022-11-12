//survey.js   Ming Jie Wang   301188372   route section
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the survey model
let survey = require('../models/survey');

/* GET survey List page. READ */
router.get('/', (req, res, next) => {
  // find all survey in the survey collection
  survey.find( (err, survey) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('survey/index', {
        title: 'Survey',
        survey: survey
      });
    }
  });

});

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //direct user to add page
     res.render('survey/details', {
      title: 'Add a Survey',
      survey: ''
    });
});

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //create object with info
    let newSurvey = survey({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    survey.create(newSurvey, (err, survey) =>{res.redirect('/survey');});
});

// GET the Survey Details page in order to update an existing Survey
router.get('/update/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //get id
    let id = req.params.id;
    //search info by id
    survey.findById(id, (err, surveyToupdate) => {
      res.render('survey/details', {title: 'Update Survey', survey: surveyToupdate});
  });
});



// POST - process the information passed from the details form and update the document
router.post('/update/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //get id
     let id = req.params.id
    
     //create object with update object
     let updatedSurvey = survey({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    
    //update object
     survey.updateOne({_id: id}, updatedSurvey, (err) => {
          res.redirect('/survey');
     });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //get id
    let id = req.params.id;

    //remove survey by id
    survey.remove({_id: id}, (err) => {res.redirect('/survey');});
});


module.exports = router;
