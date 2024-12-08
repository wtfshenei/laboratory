const mongoose = require('mongoose');

const thingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true}
});

const Thing = mongoose.model('thing', thingSchema);

module.exports = Thing;