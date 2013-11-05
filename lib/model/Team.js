var	Hero = require('./Hero'),
	conf = require('../../config/hero'),
	_ = require('lodash');

module.exports = Team;

function Team(userName) {
	this.heros = [];
	this.userName = userName;
}

Team.prototype = {
	constructor: Team,

	addHero: function(hero) {
		if (!_.contains(this.heros, hero)) {
			if (this.heros.length < conf.maxTeamMember) {
				this.heros.push(hero);
			}
		}

		return this;
	},

	delHero: function(hero) {
		this.heros = _.without(this.heros, hero);
	},

	getHeros: function() {
		return this.heros;
	},

	fight: function(cb) {
		if (this.heros.length <= 0) {
			cb('Team is empty, please add member to team');

			return;
		} 

		var fightHeros = getFightingHeros();

		// mock fighting...
		var that = this;
		setTimeout(function() {
			var success = _.random(0, 1);

			if (success) {
				var gotHeros = getRandomHeros(fightHeros, _.random(0, 3));

				gUsers[that.userName].addHeros(gotHeros);

				cb(null, {
					winStatus: true,
					heros: gotHeros
				});
			} else {
				cb(null, {
					winStatus: false,
					heros: []
				});
			}
		}, 100);
	}
};


function getFightingHeros() {
	var heros = [];
	var num = 5;

	while (num--) {
		heros.push(new Hero());
	}

	return heros;
}

function getRandomHeros(heros, num) {
	heros = _.shuffle(heros);

	return heros.slice(0, num);
}
