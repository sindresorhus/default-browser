'use strict';
var defaultBrowserId = require('default-browser-id');
var bundleName = require('bundle-name');

module.exports = function (cb) {
	defaultBrowserId(function (err, id) {
		if (err) {
			return cb(err);
		}

		bundleName(id, function (err, name) {
			if (err) {
				return cb(err);
			}

			cb(null, {
				name: name,
				id: id
			});
		});
	});
};
