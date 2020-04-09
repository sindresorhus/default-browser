'use strict';
const defaultBrowserId = require('default-browser-id');
const bundleName = require('bundle-name');
const windows = require('./windows');

module.exports = () => {
	if (process.platform === 'linux') {
		return require('xdg-default-browser')();
	}

	if (process.platform === 'darwin') {
		return defaultBrowserId().then(id => bundleName(id).then(name => ({name, id})));
	}

	if (process.platform === 'win32') {
		return windows();
	}

	return Promise.reject(new Error('Only macOS, Windows, and Linux are supported'));
};
