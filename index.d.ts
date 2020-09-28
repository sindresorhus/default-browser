declare namespace defaultBrowser {
	interface Browser {
		/**
		Human-readadable name of the browser.
		*/
		name: string;

		/**
		Unique ID for the browser on the current platform:
		- On macOS, it's the ID in LaunchServices.
		- On Linux, it's the desktop file ID (from `xdg-mime`)
		*/
		id: string;
	}
}

/**
Get the default browser for the current platform.

@returns A promise for the browser.
*/
declare function defaultBrowser(): Promise<defaultBrowser.Browser>;

export = defaultBrowser;
