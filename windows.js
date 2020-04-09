'use strict';
const execa = require('execa');
const util = require('util');

// Windows doesn't have browser IDs in the same way OSX/Linux does--give fake
// ones that look real and match the OSX/Linux versions for cross-platform apps.
const windowsBrowserProgIds = {
	AppXq0fevzme2pys62n3e0fbqa7peapykr8v: {name: 'Edge', id: 'com.microsoft.edge.old'},
	MSEdgeDHTML: {name: 'Edge', id: 'com.microsoft.edge'}, // On OSX, its "com.microsoft.edgemac"
	'IE.HTTP': {name: 'Internet Explorer', id: 'com.microsoft.ie'},
	FirefoxURL: {name: 'Firefox', id: 'org.mozilla.firefox'},
	ChromeHTML: {name: 'Chrome', id: 'com.google.chrome'}
};

function UnknownBrowserError(message) {
	Error.captureStackTrace(this, UnknownBrowserError);
	this.name = this.constructor.name;
	this.message = message;
}

util.inherits(UnknownBrowserError, Error);

module.exports = _execa =>
	(_execa || execa)('reg', [
		'QUERY',
		' HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice',
		'/v',
		'ProgId'
	]).then(result => {
		// Execa@0.10 throws if the command fails--no need to check `result.failed`

		const match = /ProgId\s*REG_SZ\s*(\S+)/.exec(result.stdout);
		if (!match) {
			throw new UnknownBrowserError(`Cannot find windows browser in stdout: ${JSON.stringify(result.stdout)}`);
		}

		const browser = windowsBrowserProgIds[match[1]];
		if (!browser) {
			throw new UnknownBrowserError(`Unknown browser ID ${JSON.stringify(browser)}`);
		}

		return browser;
	});

module.exports.UnknownBrowserError = UnknownBrowserError;
