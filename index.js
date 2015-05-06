'use strict';
var defaultBrowserId = require('default-browser-id');
var bundleName = require('bundle-name');

module.exports = function (cb) {
	if (process.platform === 'linux') {
		require('xdg-default-browser')(cb);
		return;
	}

	if (process.platform !== 'darwin') {
		throw new Error('Only OS X and Linux systems are supported');
	}

	defaultBrowserId(function (err, id) {
		if (err) {
			cb(err);
			return;
		}

		bundleName(id, function (err, name) {
			if (err) {
				cb(err);
				return;
			}

			cb(null, {
				name: name,
				id: id
			});
		});
	});
};
