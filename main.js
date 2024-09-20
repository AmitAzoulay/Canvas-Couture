const mongoose = require('mongoose');
const express = require('express')
var cors = require('cors')
require('dotenv').config();
const ordersRoute = require('./routes/order');
const productsRoute = require('./routes/product');

const port = +process.env.PORT

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected!'));


const app = express()
app.use(cors())
app.use('/routes/order', ordersRoute);
app.use('/routes/product', productsRoute);

/*app.get('/', async (req, res) => {
    try {
        const users = await Users.find()
        const products = await Products.find()
        res.json({ users, products, orders });
    }
    catch (error) {
        res.status(500).send('Error fetching data');
    }
})*/

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


