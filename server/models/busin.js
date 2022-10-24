let mongoose = require('mongoose');
let businModel = mongoose.Schema({
    name: String,
    number: Number,
    email: String

},

    {
        collection: "busin"
    });

module.exports = mongoose.model('busin', businModel);