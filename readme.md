# default-browser [![Build Status](https://travis-ci.org/sindresorhus/default-browser.png?branch=master)](http://travis-ci.org/sindresorhus/default-browser)

> Get the default browser (OS X)


## Install

```
npm install --save default-browser
```


## Example

```js
var defaultBrowser = require('default-browser');

defaultBrowser();
//=> { name: 'Safari', id: 'com.apple.Safari' }
```


## CLI

You can also use it as a CLI app by installing it globally:

```
npm install --global default-browser
```

### Usage

```
default-browser
```

Which will for example output `Safari`.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
