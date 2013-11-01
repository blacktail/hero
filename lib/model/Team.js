var	Hero = require('./Hero'),
	conf = require('../../config/hero'),
	_ = requier('lodash');

module.exports = Team;

function Team(user) {
	this.heros = [];
	this.user = user;
}

Team.prototype = {
	constructor: Team,

	addHero: function(hero) {
		if (this.heros.length < conf.maxTeamMember) {
			this.heros.push(hero);
		}

		return this;
	},

	delHero: function(hero) {
		this.heros = _.without(this.heros, hero);
	}
};


