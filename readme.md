# default-browser [![Build Status](https://travis-ci.org/sindresorhus/default-browser.svg?branch=master)](https://travis-ci.org/sindresorhus/default-browser)

> Get the default browser (OS X)


## Usage

```sh
$ npm install --save default-browser
```

```js
var defaultBrowser = require('default-browser');

defaultBrowser(function (err, browser) {
	console.log(browser);
	//=> { name: 'Safari', id: 'com.apple.Safari' }
});
```


## CLI

```sh
$ npm install --global default-browser
```

```
$ default-browser --help

  Example
    default-browser
    Safari
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
