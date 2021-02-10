const mongoose = require('mongoose');

try {
    delete mongoose.connection.models['CrudExample'];
}
catch(err) {
    console.log(err);
}

const CrudExampleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('CrudExample', CrudExampleSchema);