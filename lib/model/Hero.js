var	_ = require('lodash');
var levelRatio = 1.2;

module.exports = Hero;

function Hero(type, attr) {
	_.extend(this, getHeroTypeDefaultAttr(type), attr);
	this.id = _.uniqueId('hero');
	this.name = this.id;
}

Hero.prototype = {
	constructor: Hero,

	upLevel: function() {
		this.level++;
		this.life = this.life * levelRatio;
		this.attack = this.attack * levelRatio;
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
		description: 'Hero desciption desciption desciption',
		origin: 1 			// where are the hero from
	};

	return HeroTypeDefaultAttr;
}
