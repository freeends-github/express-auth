const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());

const authRoute = require('./routes/auth');
const crudExamplesRoute = require('./routes/crud-examples');

const auth = require('./middlewares/auth');

// Provide connection string from .env file
// mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req,res) => {
    res.json({
        message: "Welcomee!!!"
    });
});

// Authentication routes
app.use('/api/user', authRoute);

// Other routes
app.use('/api/crud-examples', auth, crudExamplesRoute);

// Error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
app.use((error, req,res,next) => {
    res.json({
        status: error.status || 500,
        message: error.message
    })
})

app.listen(process.env.PORT || 3000);