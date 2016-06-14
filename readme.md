# default-browser [![Build Status](https://travis-ci.org/sindresorhus/default-browser.svg?branch=master)](https://travis-ci.org/sindresorhus/default-browser)

> Get the default browser (macOS and Linux)


## Install

```
$ npm install --save default-browser
```


## Usage

```js
const defaultBrowser = require('default-browser');

defaultBrowser().then(browser => {
	console.log(browser);
	//=> {name: 'Safari', id: 'com.apple.Safari'}
});
```


## Related

- [default-browser-cli](https://github.com/sindresorhus/default-browser-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
