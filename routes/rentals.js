const {Rental, validate} = require('../models/rentals');
const { Customer } = require('../models/customers');
const { Movie } = require('../models/movies');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

Fawn.init(mongoose);

router.get('/api/rentals', (req, res) =>{
    res.send(rentals)
});

router.post('api/rentals', (req, res) =>{
    console.log(req.body);
});


router.get('/', async(req, res) =>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals)
})

router.post('/', async(req, res) =>{
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie')

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    // Old ways of saving data
    // rental = await rental.save();

    // movie.numberInStock--;
    // movie.save();
    try{
        new Fawn.Task()
        .save('rentals', rental)
        .update('movies', {_id: movie._id}, {
            $inc: { numberInStock: -1}
        })
        .run();

        res.send(rental);
    }
    catch(ex) {
        res.status(500).send();
    }
    
})

const validateRentals = (rentals) =>{
    const schema = Joi.object(
        {
            "type":Joi.string().required().min(3),
            "is":Joi.string().required().min(3)})
    return schema.validate(rentals)
}


exports.validate = validateRentals