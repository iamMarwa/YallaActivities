const express = require('express');
const router = express.Router();
const BookingModel = require('../models/BookingModel');
const { response} = require('express');

router.post(
    '/create',
    function(req, res){
        const formData = {
            name: req.body.name,
            location: req.body.location,
        };
        BookingModel
        .create(formData)
        .then(
            function(dbDocument) {
                res.send(dbDocument);
            }
        )
        .catch(
            function(mongooseError) {
                console.log(mongooseError)
                res.send("Error occured. Check the shell.");
            }
        )

    }
);


router.get(
    '/view',
    function(req, res) {
        ActivityModel
        .find()
        .then(
            function(dbDocuments) {
                res.json(dbDocuments)
            }  
        )
        .catch()
    }
)
module.exports = router;