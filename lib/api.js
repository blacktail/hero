var User = require('./model/User');

module.exports = {
	login: login,
	getUsers: getUsers,
	addHeroToTeam: addHeroToTeam
};

function login(req, res) {
	var userName = (String(req.param('name')) || '').trim();

	if (!userName.trim()) {
		res.json({
			status: false,
			msg: 'your name is invalid, please retry.'
		})
	} else {
		var user = gUsers[userName] || new User(userName);
		res.json({
			status: true,
			data: user
		});
	}
}

function getUsers(req, res) {
	res.json({
		status: true,
		data: gUsers
	});
}

function addHeroToTeam(req, res) {
	var userName = req.param('name'),
		user = gUsers[userName],
		heroId = req.param('id'),
		hero = gHeros[heroId];


	if (!user) {
		res.json({
			status: false,
			msg: 'can not add hero to a team, user not found.'
		});

		return;
	}

	if (!hero) {
		res.json({
			status: false,
			msg: 'can not add hero to a team, hero not found.'
		});

		return;
	}

	var team = user.team;


	team.addHeroToTeam(hero);

	
}
