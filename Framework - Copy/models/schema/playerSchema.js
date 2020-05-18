const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerProfileSchema = require('./playerProfileSchema');

const playerSchema = new Schema({
    profile: {
        type: playerProfileSchema,
        required: true
    }
});

module.exports = playerSchema