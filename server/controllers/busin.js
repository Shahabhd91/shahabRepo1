let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let busin = require('../models/busin');
module.exports.displaybusinList = (req, res, next) => {
    busin.find((err, businList) => {
        if (err) {
            return console.error(err);
        }
        else {
            //console.log(businList);
            res.render('busin/list', { title: 'busins', businList: businList });
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('busin/add', { title: 'Add busin' })

}

module.exports.processAddPage = (req, res, next) => {
    let newbusin = busin({
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email

    });
    busin.create(newbusin, (err, busin) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businList');
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    busin.findById(id, (err, businToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('busin/edit', { title: 'Edit busin', busin: businToEdit });

        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id
    console.log(req.body);
    let updatedbusin = busin({
        "_id": id,
        "name": req.body.name,
        "number": req.body.number,
        "email": req.body.email
    });
    busin.updateOne({ _id: id }, updatedbusin, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businList');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;
    busin.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/businList');
        }
    });
}


