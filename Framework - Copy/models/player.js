const mongoose = require('mongoose');
const playerSchema = require('./schema/playerSchema');

const Player = mongoose.model('Player', playerSchema);

exports.create = async function(playerProfile) {
    let player = new Player({
        profile: playerProfile
    });

    return await player.save();
}