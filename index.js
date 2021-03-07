import defaultBrowserId from 'default-browser-id';
import bundleName from 'bundle-name';
import windows from './windows.js';

export default async function defaultBrowser() {
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

	throw new Error('Only macOS, Linux, and Windows are supported');
}
