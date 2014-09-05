'use strict';
var assert = require('assert');
var defaultBrowser = require('./');

it('should return the default browser', function (cb) {
	defaultBrowser(function (err, browser) {
		console.log('Browser:', browser);
		assert(/^com\./.test(browser.id));
		cb();
	});
});
