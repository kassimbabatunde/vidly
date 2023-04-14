const express = require('express');
const app = express();
app.use(express.json());
const logger = require('./middleware/logger')
const genres = require('./routes/genres');
const home = require('./routes/home');
app.use(logger);
app.use('/',home);
app.use('/api/genres',genres);


const server = app.listen(5000,()=>{
    console.log('Listeing to port 5000...')
})

module.exports = server;