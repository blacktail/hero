var Team = require('./Team'),
	Hero = require('./Hero'),
	_ = require('lodash');

module.exports = User;

function User(name) {
	this.name = name;
	this.heros = [new Hero()];	// add an initial hero for new user
	this.team = new Team(this.name);

	global.gUsers[name] = this;
}

User.prototype = {
	constructor: User,

	addHeros: function(heros) {
		if (heros instanceof Hero) {
			heros = [heros];
		}

		_.each(heros, function (hero) {
			if (hero instanceof Hero) {
				this.heros.push(hero);
			}
		}, this);
	},

	delHero: function(hero) {
		this.heros = _.without(this.heros, hero);
	},

	getHeroById: function(hid) {
		return _.find(this.heros, function(hero) {
			return hero.id == hid;
		});
	}
};


