var	_ = require('lodash');

module.exports = Hero;

function Hero(type, attr) {
	_.extend(this, getHeroTypeDefaultAttr(type), attr);
}

Hero.prototype = {
	constructor: User,

	attack: function() {
	},

	attacked: function(hero) {
		
	}
};

function getHeroTypeDefaultAttr(type) {
	var HeroTypeDefaultAttr = {
		name: 'Hero1',		// hero's name
		star: 1,			// start level
		level: 1,			// role level
		life: 500,			// max life value
		attack: 100,		// average attack value
		leadership: 1,		// leadership ability value
		skills: [],			// skill list
		equips: [],			// equipment list
		desciption: 'Hero desciption desciption desciption',
		origin: 1 			// where are the hero from
	};

	return HeroTypeDefaultAttr;
}



