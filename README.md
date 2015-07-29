# forward-to

Utility function for method call forwarding from one object to another

[![Build Status](https://travis-ci.org/seerdomin/forward-to.svg?branch=master)](https://travis-ci.org/seerdomin/forward-to)

## Installation

via npm

    $ npm install forward-to

or via git

    $ git clone https://github.com/seerdomin/forward-to

## Usage

```
var forward = require('forward-to');

var proxy = Object.create(null);

var api = {
    'prefix': {
        'foo': 'foo',
        'hello': 'hello'
    },

    'foo': function foo(str) {
        console.log(this.prefix.foo + ' ' + str);
    },

    'hello': function hello(str) {
        console.log(this.prefix.hello + ' ' + str);
    }
};

forward(proxy, api, ['foo', 'hello']);

console.log(typeof proxy.prefix);
// => "undefined"

proxy.foo('bar');
// => "foo bar"

proxy.hello('world');
// => "hello world"

```

## Goals

Provide a safe way to access an object's api without exposing its internal state.

## License

This library is distributed under the MIT License.
