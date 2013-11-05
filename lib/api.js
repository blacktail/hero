var User = require('./model/User'),
	_ = require('lodash');

module.exports = {
	getUsers: getUsers,
	getUserHeros: getUserHeros,
	addHeroToTeam: addHeroToTeam,
	upLevel: upLevel,
	deleteHeroToTeam: deleteHeroToTeam,
	getTeamHeros: getTeamHeros,
	fight: fight
};

function getUsers(req, res) {
	res.json({
		status: true,
		data: _.values(gUsers)
	});
}

function getUserHeros(req, res) {
	var user = gUsers[req.session.user];

	res.json({
		status: true,
		data: user.heros
	});
}

function upLevel(req, res) {
	var heroId = req.params.hid,
		user = gUsers[req.session.user];

	var hero = user.getHeroById(heroId);

	if (!hero) {
		res.json({
			status: false,
			msg: 'You have no this hero now.'
		});
	} else {
		hero.upLevel();

		res.json({
			status: true,
			data: hero
		});
	}
}

function addHeroToTeam(req, res) {
	var userName = req.session.user,
		user = gUsers[userName],
		heroId = req.params.hid,
		hero = user.getHeroById(heroId);

	if (!hero) {
		res.json({
			status: false,
			msg: 'can not add hero to a team, hero not found.'
		});

		return;
	}

	var team = user.team;

	team.addHero(hero);

	res.json({
		status: true
	});
}


function deleteHeroToTeam(req, res) {
	var userName = req.session.user,
		user = gUsers[userName],
		heroId = req.params.hid,
		hero = user.getHeroById(heroId);

	if (!hero) {
		res.json({
			status: false,
			msg: 'can not delete hero, hero not found.'
		});

		return;
	}

	var team = user.team;

	team.delHero(hero);

	res.json({
		status: true,
		data: team.getHeros()
	});
}

function getTeamHeros(req, res) {
	var userName = req.session.user,
		user = gUsers[userName];

	res.json({
		status: true,
		data: user.team.getHeros()
	});
}

function fight(req, res) {
	var userName = req.session.user,
		user = gUsers[userName];

	user.team.fight(function(err, data) {
		if (err || data.winStatus == false) {
			res.json({
				status: false,
				msg: err || 'fight failed.'
			});
		} else {
			res.json({
				status: true,
				msg: 'fight successully.',
				data: data.heros
			});
		}
	});
}
