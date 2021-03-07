'use strict';
const defaultBrowserId = require('default-browser-id');
const bundleName = require('bundle-name');
const windows = require('./windows');

module.exports = async () => {
	if (process.platform === 'linux') {
		return require('xdg-default-browser')();
	}

	if (process.platform === 'darwin') {
		const id = await defaultBrowserId();
		const name = await bundleName(id);
		return {name, id};
	}

	if (process.platform === 'win32') {
		return windows();
	}

	throw new Error('Only macOS, Windows, and Linux are supported');
};
