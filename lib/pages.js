var User = require('./model/User');

module.exports = {
	login: login,
	getLoginPage: getLoginPage,
	index: index
};

function login(req, res) {
	var userName = (String(req.param('name')) || '').trim();

	if (!userName.trim()) {
		res.render('login', {
			error: 'your name is invalid, please retry.'
		})
	} else {
		if (req.session.user) {
			res.render('login', {
				error: "You have been logined with user name: " + req.session.user
			});
		} else {
			var user = new User(userName);

			req.session.user = userName;

			res.redirect('/');
		}
	}
}

function getLoginPage(req, res) {
	res.render('login');
}

function index(req, res) {
	res.render('index');
}
