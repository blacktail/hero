var	Hero = require('./Hero'),
	conf = require('../../config/hero'),
	_ = requier('lodash');

module.exports = User;

function Team() {
	this.heros = [];
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


