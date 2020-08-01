const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const verify = require('./routes/verifyToken');

mongoose.connect('stringprejenv', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/user', authRoute);
app.get('/asd', veriy, (req,res) => {
    res.send("works");
})
app.listen(3000);