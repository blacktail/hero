var User = require('./model/User');

module.exports = {
	login: login,

};

function login(req, res) {
	var userName = req.param('name'),
		user = gUsers[userName] || new User(userName);

	
}
