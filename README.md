# Babel Schema Util [![Build Status](https://travis-ci.org/ycjcl868/babel-plugin-schema-util.svg?branch=master)](https://travis-ci.org/ycjcl868/babel-plugin-schema-util) [![Codecov](https://img.shields.io/codecov/c/github/ycjcl868/babel-plugin-schema-util/master.svg?style=flat-square)](https://codecov.io/gh/ycjcl868/babel-plugin-schema-util/branch/master) [![npm package](https://img.shields.io/npm/v/babel-plugin-schema-util.svg?style=flat-square)](https://www.npmjs.org/package/babel-plugin-schema-util)

forked by [babel-plugin-inline-import](https://github.com/credcollective/babel-plugin-inline-import), **you can apply different handler functions into the different files.**

Babel plugin to add the opportunity to use `import` with raw/literal content<br>
It is good e.g. for importing `*.schema` files into your code.

## Examples
[schema](https://www.npmjs.com/package/schema-util) transform demo

Now (with Babel Schema Util):
```javascript
// /some/demo.schema
Array(foo) {
  href(href),
  title(title),
  img(image url): Image,
  amount(money amout)
}

// /some/a.js
import demo from './demo';
```

```javascript
// /build/a.js
var demo = "{\"type\":\"array\",\"description\":\"foo\",\"properties\":{\"href\":{\"type\":\"string\",\"description\":\"href\"},\"title\":{\"type\":\"string\",\"description\":\"title\"},\"img\":{\"type\":\"image\",\"description\":\"image url\"},\"amount\":{\"type\":\"string\",\"description\":\"money amout\"}}}";

```

**Note:** both cases are equivalent and will result in similar code after Babel transpile them. Check [How it works](#how-it-works) section for details.

## Install
```
npm install babel-plugin-schema-util --save-dev
```

## Use
Add a `.babelrc` file and write:
```javascript
{
  "plugins": [
    "babel-plugin-schema-util"
  ]
}
```
or pass the plugin with the plugins-flag on CLI
```
babel-node myfile.js --plugins babel-plugin-schema-utilt
```

By default, Babel-Schema-Util is compatible with the following file extensions:

* .raw
* .text
* .graphql
* .schema


## Customize
If you want to enable different file extensions, you can define them in your `.babelrc` file
```javascript
{
  "plugins": [
    ["babel-plugin-schema-util", {
      "extensions": [
        ".json",
        ".sql",
        {
          name: ".schema2",
          loader: (content) => `~${content}~`,
        }
      ]
    }]
  ]
}
```

## Motivate
If you like this project just give it a star :) I like stars.
