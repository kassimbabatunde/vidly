const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db_connect')();
require('./startup/validation')();

const home = require('./routes/home');
app.use('/', home);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    winston.info(`Listeing to port ${port}...`)
});