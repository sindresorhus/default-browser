# default-browser [![Build Status](https://travis-ci.org/sindresorhus/default-browser.svg?branch=master)](https://travis-ci.org/sindresorhus/default-browser)

> Get the default browser (OS X)


## Install

```bash
$ npm install --save default-browser
```


## Usage

```js
var defaultBrowser = require('default-browser');

defaultBrowser(function (err, browser) {
	console.log(browser);
	//=> { name: 'Safari', id: 'com.apple.Safari' }
});
```


## CLI

You can also use it as a CLI app by installing it globally:

```bash
$ npm install --global default-browser
```

### Usage

```bash
$ default-browser
```

Which will for example output `Safari`.


## License

[MIT](http://opensource.org/licenses/MIT) © [Sindre Sorhus](http://sindresorhus.com)
