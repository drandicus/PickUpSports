var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
	host: String,
	sport: String,
	loc: {
		lat: Number,
		lon: Number
	}
	time: Date,
	max: Number,
	priv: Boolean,
	people: [String]
});

var Game = mongoose.model('Game', gameSchema);
module.exports = User;