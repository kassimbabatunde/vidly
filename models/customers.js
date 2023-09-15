const Joi = require('joi');
const mongoose = require('mongoose');

const customer = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    }
});

const validateCustomer = (customer) => {
    const schema = {
        name: Joi.string
    }
}

exports.customer = customer
exports.validate = validateCustomer