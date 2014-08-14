#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var defaultBrowser = require('./');
var argv = process.argv.slice(2);

function help() {
	console.log([
		'',
		'  ' + pkg.description,
		'',
		'  Example',
		'    default-browser',
		'    Safari'
	].join('\n'));
}

if (argv.indexOf('--help') !== -1) {
	help();
	return;
}

if (argv.indexOf('--version') !== -1) {
	console.log(pkg.version);
	return;
}

defaultBrowser(function (err, data) {
	if (err) {
		throw err;
	}

	console.log(data.name);
});
