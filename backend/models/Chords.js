const { Schema, model} = require('mongoose');

const ChordsSchema = new Schema({
    title: { type: String, required: true},
    author: {type: String, required: true},
    year: {type: String, required: true},
    imagePath: {type: String},
    created_at: {type: Date, default: Date.now}
});

module.exports = model('Chord', ChordsSchema);