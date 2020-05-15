const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerProfileSchema = new Schema({
    anger: Number,
    disgust: Number,
    fear: Number,
    anxiety: Number,
    sadness: Number,
    desire: Number,
    relaxation: Number,
    happiness: Number
});

module.exports = playerProfileSchema