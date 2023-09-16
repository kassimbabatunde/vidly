const mongoose = require('mongoose');
const winston = require('winston');

module.exports = () =>{
    // old ways
    // mongoose.connect('mongodb://localhost/vidly')
    // .then(() => {console.log('Connected to MongoDB...')})
    // .catch(() => console.log('Could not connect to MongoDB'));
    mongoose.connect('mongodb://localhost/vidly')
    .then(() => winston.info('Connected to MongoDB...'));
}
