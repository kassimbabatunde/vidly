const winston = require('winston');
require('winston-mongodb');
const express = require('express');
const app = express();
require('./startup/routes')(app);
require('./startup/db_connect')()
const logger = require('./middleware/logging');
const home = require('./routes/home');
app.use(logger);
app.use('/',home);


winston.ExceptionHandler(
    new winston.transports.File({filename: 'uncaughtExceptions.log'})
)
process.on('unhandledRejection', (ex)=>{
    throw ex;
})
winston.add(winston.transports.File, {filename: 'errorlog.log'});

const port = process.env.PORT || 5000;

const server = app.listen(port,()=>{
    console.log(`Listeing to port ${port}...`)
})

module.exports = server;