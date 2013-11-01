module.exports = {
	login: login
};

function login(req, res) {
	console.log(req.param('name'));
}
