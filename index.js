const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
dotenv.config();
app.use(bodyParser.json());

const authRoute = require('./routes/auth');
const auth = require('./middlewares/auth');

// Provide connection string from .env file
// mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

// Authentication routes
app.use('/api/user', authRoute);

// Example of using auth middleware on a route
app.get('/protected', auth, (req,res) => {
    res.json({
        message: "Prottected route"
    });
})

app.listen(3000);