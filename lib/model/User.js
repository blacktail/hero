var Team = require('./Team'),
	Hero = require('./Hero'),
	_ = require('lodash');

module.exports = User;

function User(name) {
	this.name = name;
	this.heros = [new Hero()];	// add an initial hero for new user
	this.team = new Team;

	global.gUsers[name] = this;
}

User.prototype = {
	constructor: User,

	addHero: function(hero) {
		this.heros.push(hero);
	},

	delHero: function(hero) {
		this.heros = _.without(this.heros, hero);
	}
};


