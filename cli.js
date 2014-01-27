#!/usr/bin/env node
'use strict';
var defaultBrowser = require('./index');

if (process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
	return console.log('Usage\n  default-browser\n\nExample output\n  Safari\n\nReturns the name of the default browser');
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
	return console.log(require('./package').version);
}

defaultBrowser(function (err, data) {
	if (err) {
		throw err;
	}

	console.log(data.name);
});
