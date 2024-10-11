import {promisify} from 'node:util';
import {execFile} from 'node:child_process';

const execFileAsync = promisify(execFile);

// Windows doesn't have browser IDs in the same way macOS/Linux does so we give fake
// ones that look real and match the macOS/Linux versions for cross-platform apps.
const windowsBrowserProgIds = {
	AppXq0fevzme2pys62n3e0fbqa7peapykr8v: {name: 'Edge', id: 'com.microsoft.edge.old'},
	MSEdgeDHTML: {name: 'Edge', id: 'com.microsoft.edge'}, // On macOS, it's "com.microsoft.edgemac"
	MSEdgeHTM: {name: 'Edge', id: 'com.microsoft.edge'}, // Newer Edge/Win10 releases
	'IE.HTTP': {name: 'Internet Explorer', id: 'com.microsoft.ie'},
	FirefoxURL: {name: 'Firefox', id: 'org.mozilla.firefox'},
	ChromeHTML: {name: 'Chrome', id: 'com.google.chrome'},
	BraveHTML: {name: 'Brave', id: 'com.brave.Browser'},
	BraveBHTML: {name: 'Brave Beta', id: 'com.brave.Browser.beta'},
	BraveSSHTM: {name: 'Brave Nightly', id: 'com.brave.Browser.nightly'},
	OperaStable: {name: 'Opera', id: 'com.opera.browser'},
	'FirefoxURL\-([A-Z0-9]+)': {name: 'Firefox', id: 'org.mozilla.firefox'},
};

export class UnknownBrowserError extends Error {}

export default async function defaultBrowser(_execFileAsync = execFileAsync) {
	const {stdout} = await _execFileAsync('reg', [
		'QUERY',
		' HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice',
		'/v',
		'ProgId',
	]);

	const match = /ProgId\s*REG_SZ\s*(?<id>\S+)/.exec(stdout);
	if (!match) {
		throw new UnknownBrowserError(`Cannot find Windows browser in stdout: ${JSON.stringify(stdout)}`);
	}

	const {id} = match.groups;
	let browser = windowsBrowserProgIds[id];

	/* Check via Regular-Expressions */
	if(!browser) {
		try {
			Object.keys(windowsBrowserProgIds).forEach((key) => {
				let expression = new RegExp(key);

				if(expression.test(id)) {
					let matches = id.match(expression);
					let additional = [];
					browser = windowsBrowserProgIds[key];

					if(matches.length > 1) {
						matches.forEach((match, index) => {
							if(index === 0) {
								return;
							}

							additional.push(match);
						});

						/* Add additional informations */
						browser.additional = additional;
					}
				}
			});
		} catch (e) {
			/* Do Noting on Errors */
		}
	}

	if (!browser) {
		throw new UnknownBrowserError(`Unknown browser ID: ${id}`);
	}

	return browser;
}
