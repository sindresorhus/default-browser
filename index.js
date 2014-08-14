'use strict';
var defaultBrowserId = require('default-browser-id');
var bundleName = require('bundle-name');

module.exports = function (cb) {
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
