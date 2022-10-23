let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');

// Create a refrence to the model
let Book = require('../models/book');

module.exports.displayBooklist = (req, res, next) => {
    Book.find((err, bookList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(BookList);
            res.render('book/list',
                {
                    title: 'Books',
                    BookList: bookList, displayName: req.user ? req.user.displayName : ''
                });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', { title: 'Add book' });
}

module.exports.ProcessAddPage = (req, res, next) => {
    let newBoook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });
    Book.create(newBoook, (err, Book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //refesh the book list
            res.redirect('/book-List');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            //show edit view
            res.render('book/edit', {
                title: 'Edit Book', book: bookToEdit,
                displayName: req.user ? req.user.displayName : ''
            });
        }
    })
}

module.exports.ProcessEditPage = (req, res, next) => {
    let id = req.params.id;
    let updatedBook = Book({
        "_id": id,
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });
    Book.updateOne({ _id: id }, updatedBook, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/book-List');
        }
    });
}

module.exports.PerformDelete = (req, res, next) => {
    let id = req.params.id;
    Book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/book-List');
        }
    });

}