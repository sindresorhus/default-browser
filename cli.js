#!/usr/bin/env node
'use strict';
var meow = require('meow');
var defaultBrowser = require('./');

meow({
	help: [
		'Example',
		'  $ default-browser',
		'  Safari'
	]
});

defaultBrowser(function (err, data) {
	if (err) {
		console.error(err.message);
		process.exit(1);
	}

	console.log(data.name);
});
