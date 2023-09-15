const winston = require('winston');
const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./middleware/logger')
const genres = require('./routes/genres');
const home = require('./routes/home');
app.use(logger);
app.use('/',home);
app.use('/api/genres',genres);

winston.ExceptionHandler(
    new winston.transports.File({filename: 'uncaughtExceptions.log'})
)
process.on('unhandledRejection', (ex)=>{
    throw ex;
})
winston.add(winston.transports.File, {filename: 'errorlog.log'});

const server = app.listen(5000,()=>{
    console.log('Listeing to port 5000...')
})

module.exports = server;