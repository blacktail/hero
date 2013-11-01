var express = require('express'),
	app = express(),
	_ = require('lodash'),
	conf = require('../config/hero'),
	routes = require('../config/routes');

var access_logfile = require('fs').createWriteStream(conf.logging.access, {flags: 'a'});

/* define globals for data store for protype design, we can
implement the store using databases in the future
*/
global.gUsers = {};
global.gHeros = {};

// middleware stack below
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

// setup routers
_.each(routes, function(route) {
	app[route.method](route.url, function() {
		var mod = require(route.module);
		mod[route.func].apply(mod, arguments);
	});
});


// startup server
if (require.main == module.parent) {
	app.listen(conf.port, function () {
		console.log("Hero server listening on port %d in %s mode", conf.port, app.settings.env);
	});
}
