const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
require('dotenv').config();

const server = express()
server.use(cors())
server.use(express.static('public'))


server.use('/products', require('./routes/products'))
server.use('/', require('./routes/index'))

server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected!'));


