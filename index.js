'use strict';
var slice = [].slice;

module.exports = forward;

function forward(receiver, provider, methods) {
    if (!methods) {
        methods = getMethods(provider);
    }
    else if (typeof methods === 'string') {
        methods = [methods];
    }
    else {
        methods = slice.call(methods);
    }

    methods.forEach(function methodsIterator(method) {
        forwardMethod(receiver, provider, method);
    });

    return receiver;
}

function getMethods(provider) {
    var methods = isMethod.bind(null, provider);

    return Object.keys(provider).filter(methods);
}

function isMethod(provider, name) {
    return (typeof provider[name] === 'function');
}

function forwardMethod(receiver, provider, name) {
    receiver[name] = function forwardedMethod() {
        var args = slice.call(arguments);
        var func = provider[name];
        var result = func.apply(this, args);

        return (result === provider) ? this : result;
    };

    return receiver;
}
