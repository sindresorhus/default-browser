'use strict';
var assert = require('assert');
var defaultBrowser = require('./');

it('should return the default browser', function () {
	return defaultBrowser().then(function (browser) {
		assert(/^com\./.test(browser.id));
	});
});
