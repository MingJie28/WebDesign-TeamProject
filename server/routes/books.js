//books.js   Ming Jie Wang   301188372   route section
// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //direct user to add page
     res.render('books/details', {
      title: 'Add a Book',
      books: ''
    });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //create object with info
    let newBooks = book({
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    book.create(newBooks, (err, book) =>{res.redirect('/books');});
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //get id
    let id = req.params.id;
    //search info by id
    book.findById(id, (err, bookToEdit) => {
      res.render('books/details', {title: 'Edit Contact', books: bookToEdit});
  });
});



// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //get id
     let id = req.params.id
    
     //create object with update object
     let updatedBooks = book({
      "_id": id,
      "Title": req.body.title,
      "Description": req.body.description,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });
    
    //update object
     book.updateOne({_id: id}, updatedBooks, (err) => {
          res.redirect('/books');
     });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //get id
    let id = req.params.id;

    //remove book by id
    book.remove({_id: id}, (err) => {res.redirect('/books');});
});


module.exports = router;
