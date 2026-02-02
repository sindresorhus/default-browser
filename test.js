import test from 'ava';
import windows, {UnknownBrowserError} from './windows.js';
import defaultBrowser from './index.js';

test('sane', async t => {
	const {id} = await defaultBrowser();
	console.log('Default browser', id);
	t.regex(id, /^(com|org)\./);
});

test('windows parsing', async t => {
	const cases = [
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    AppXq0fevzme2pys62n3e0fbqa7peapykr8v\r\n\r\n',
			expected: 'com.microsoft.edge.old',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    MSEdgeDHTML\r\n\r\n',
			expected: 'com.microsoft.edge.dev',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    ChromeHTML\r\n\r\n',
			expected: 'com.google.chrome',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    IE.HTTP\r\n\r\n',
			expected: 'com.microsoft.ie',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    IE.HTTP.ABC123\r\n\r\n',
			expected: 'com.microsoft.ie',
			expectedName: 'Internet Explorer',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    FirefoxURL\r\n\r\n',
			expected: 'org.mozilla.firefox',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    BraveHTML\r\n\r\n',
			expected: 'com.brave.Browser',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    BraveSSHTM\r\n\r\n',
			expected: 'com.brave.Browser.nightly',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    BraveBHTML\r\n\r\n',
			expected: 'com.brave.Browser.beta',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    OperaStable\r\n\r\n',
			expected: 'com.operasoftware.Opera',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    ChromeHTML.777DB3UDRZLQKML3NA3UVJA65E\r\n\r\n',
			expected: 'com.google.chrome',
			expectedName: 'Chrome',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    FirefoxURL.ABC123\r\n\r\n',
			expected: 'org.mozilla.firefox',
			expectedName: 'Firefox',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    FirefoxURL-6F193CCC56814779\r\n\r\n',
			expected: 'org.mozilla.firefox',
			expectedName: 'Firefox',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    WaterfoxHTML\r\n\r\n',
			expected: 'WaterfoxHTML',
			expectedName: 'WaterfoxHTML',
		},
		{
			output: '\r\nHKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice\r\n    ProgId    REG_SZ    WaterfoxHTML.XYZ123\r\n\r\n',
			expected: 'WaterfoxHTML.XYZ123',
			expectedName: 'WaterfoxHTML.XYZ123',
		},
	];

	await t.throwsAsync(
		async () => windows(async () => ({stdout: ''})),
		{instanceOf: UnknownBrowserError},
	);

	await Promise.all(cases.map(async testCase => {
		const actual = await windows(async () => ({stdout: testCase.output}));
		t.is(actual.id, testCase.expected);

		if (testCase.expectedName) {
			t.is(actual.name, testCase.expectedName);
		}
	}));
});
