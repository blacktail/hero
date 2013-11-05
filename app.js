module.exports = process.env.HERO_COV ?
	require('./lib-cov/hero') :
	require('./lib/hero');
