/**
Gets the default browser on the platform.
@returns a promise containing the human-readable name and bundle ID of the discovered browser.
 */
declare function defaultBrowser(): Promise<defaultBrowser.Browser>;

declare namespace defaultBrowser {
	export interface Browser {
		/**
		Human-readadable name of the browser.
		 */
		name: string;

		/**
		Unique ID for the browser on the current platform:
		- On OSX, this is the ID in LaunchServices.
		- On Linux, it's the desktop file ID (from xdg-mime)
		 */
		id: string;
	}
}

export = defaultBrowser;
