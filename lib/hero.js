var express = require('express'),
	app = express(),
	_ = require('lodash'),
	conf = require('../config/hero');

var access_logfile = require('fs').createWriteStream(conf.logging.access, {flags: 'a'});

app.use(express.logger({stream: access_logfile }));

app.set('views', __dirname + '/../views');
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded());

app.use(express.cookieParser('hero-blablabla'));

app.use(express.session({
	// set session timeout
	cookie : {
		path : '/',
		httpOnly : true,
		maxAge : conf.sessionTimeOut
	}
}));

app.use(express.methodOverride());

app.use(express.static(__dirname + '/../public'));

app.use(app.router);

if (require.main == module.parent) {
	app.listen(conf.port, function () {
		console.log("Hero server listening on port %d in %s mode", conf.port, app.settings.env);
	});
}
