const express = require('express');
const router = express.Router();
const ActivityModel = require('../models/ActivityModel');
const { response} = require('express');

router.post(
    '/create',
    function(req, res){
        const formData = {
            name: req.body.name,
            location: req.body.location,
            date: req.body.date,
            category: req.body.category,
            price: req.body.price,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };
        ActivityModel
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

router.post(
    '/find',
    function(req, res) {

        let categoryQuery = req.query.category;
        let priceQuery = req.query.price;

        ActivityModel
        .find({ category: categoryQuery } )
        .then(
            function(dbDocument) {
                res.send(dbDocument)
            } 
        )
        .catch(
            function(mongooseError) {
                console.log(mongooseError)
                res.send("Error occured. Check the shell.");
            }
        )

    }
)


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

router.get(
    '/categories',
    function(req, res) {
        ActivityModel
        .find(req.params.category )
        .then(
            function(dbDocuments) {
                res.json(dbDocuments)
            }  
        )
        .catch()
    }
)
module.exports = router;