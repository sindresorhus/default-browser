'use strict';
const defaultBrowserId = require('default-browser-id');
const bundleName = require('bundle-name');

module.exports = () => {
	if (process.platform === 'linux') {
		return require('xdg-default-browser')();
	}

	if (process.platform !== 'darwin') {
		throw new Error('Only macOS and Linux are supported');
	}

	return defaultBrowserId().then(id => bundleName(id).then(name => ({name, id})));
};
