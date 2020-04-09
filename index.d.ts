/**
 * Gets the default browser on the platform.
 * @throws if the lookup fails for any reason
 * @returns a promise containing the human-readable name and bundle ID of
 * the discovered browser.
 */
declare function lookup(): Promise<{ name: string; id: string }>;

export = lookup;
