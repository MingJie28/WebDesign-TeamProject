//301254146 301188372 survey.js
//this javascript is for routing purposes

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
        title: 'survey',
        survey: survey
      });
    }
  });

});

//  GET the Survey Details page in order to create a new Survey
router.get('/create', (req, res, next) => {



    //create object with info
    let newSurvey = survey({
      
      "Title": "New Survey",
      "Description": "",
    });
    survey.create(newSurvey, (err, survey) =>{res.redirect('/survey');});
});


// GET the Survey Details page in order to update an existing Survey
router.get('/update/:id', (req, res, next) => {

    //get id
    let id = req.params.id;
    //search info by id
    survey.findById(id, (err, surveyToupdate) => {
      res.render('survey/details', {title: 'Update Survey', survey: surveyToupdate});
  });
});



// POST - process the information passed from the details form and update the document
router.post('/update/:id', (req, res, next) => {

    //get id
     let id = req.params.id
    
     //create object with update object
     let updatedSurvey = survey({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
    });
    
    //update object
     survey.updateOne({_id: id}, updatedSurvey, (err) => {
          res.redirect('/survey');
     });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    //get id
    let id = req.params.id;

    //remove survey by id
    survey.remove({_id: id}, (err) => {res.redirect('/survey');});
});


// GET the Survey Read page
router.get('/read/:id', (req, res, next) => {

  //get id
  let id = req.params.id;
  //search info by id
  survey.findById(id, (err, surveyRead) => {
    res.render('survey/read', {title: 'Survey Read page', survey: surveyRead});
});
});


// GET the Survey Result page
router.get('/result/:id', (req, res, next) => {

  //get id
  let id = req.params.id;
  //search info by id
  survey.findById(id, (err, surveyResult) => {
    res.render('survey/result', {title: 'Survey Result', survey: surveyResult});
});
});


module.exports = router;
