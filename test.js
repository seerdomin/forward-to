'use strict';

var test = require('tape');
var sinon = require('sinon');
var forward = require('./');


test('String-based forwarding', function(t) {
    var receiver, provider, methods, spy;

    methods = 'circle';

    receiver = {};

    provider = {
        'circle': function circle(){},
        'square': function square(){},
        'triangle': function triangle(){}
    };

    spy = sinon.spy(provider, methods);

    t.comment('## forward(<object>, <object>, <string>)');

    forward(receiver, provider, methods);

    t.ok(
        isMethod(receiver, 'circle'), 
        'Calling forward() should create methods whose name match the "methods" string'
    );

    t.ok(
        (!hasProp(receiver, 'square') && !hasProp(receiver, 'triangle')), 
        'Calling forward() should not create methods whose name does not match the "methods" string'
    );

    receiver.circle();

    t.ok(
        spy.calledOnce, 
        'Calling a forwarded method on the receiver should call the same method on the provider'
    );

    t.comment(' ');

    t.end();
});


test('Array-based forwarding', function(t) {
    var receiver, provider, methods, spySquare, spyTriangle;

    receiver = {};

    provider = {
        'circle': function circle(){},
        'square': function square(){},
        'triangle': function triangle(){}
    };

    methods = ['square', 'triangle'];

    spySquare = sinon.spy(provider, 'square');

    spyTriangle = sinon.spy(provider, 'triangle');

    t.comment('## forward(<object>, <object>, <array>)');

    forward(receiver, provider, methods);

    t.ok(
        (isMethod(receiver, 'square') && isMethod(receiver, 'triangle')), 
        'Calling forward() should create methods whose names are in the "methods" array'
    );

    t.ok(
        !hasProp(receiver, 'circle'), 
        'Calling forward() should not create methods whose names are not in the "methods" array'
    );

    receiver.square();

    receiver.triangle();

    t.ok(
        (spySquare.calledOnce && spyTriangle.calledOnce), 
        'Calling forwarded methods on the receiver should call the same methods on the provider'
    );

    t.end();
});


function hasProp(obj, prop) {
    return obj.hasOwnProperty(prop);
}

function isMethod(obj, prop) {
    return (typeof obj[prop] === 'function');
}
