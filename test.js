'use strict';

var test = require('tape');
var sinon = require('sinon');
var forward = require('./');

test('Forwarding one of the provider\'s methods', function(t) {
    var receiver, provider, methods, spy;

    methods = 'circle';

    receiver = {};

    provider = {
        'circle': function circle() {
            return provider;
        }
    };

    spy = sinon.spy(provider, methods);

    forward(receiver, provider, methods);

    t.ok(
        isMethod(receiver, 'circle'), 
        'When calling forward(receiver, provider, method) : the receiver should proxy one of the provider\'s methods'
    );

    receiver.circle();

    t.ok(
        spy.calledOnce, 
        'Calling the forwarded method on the receiver should call the same method on the provider'
    );

    t.end();
});


test('Forwarding a subset of the provider\'s methods', function(t) {
    var receiver, provider, methods, spySquare, spyTriangle;

    receiver = {};

    provider = {
        'square': function square(){},
        'triangle': function triangle(){}
    };

    methods = ['square', 'triangle'];

    spySquare = sinon.spy(provider, 'square');

    spyTriangle = sinon.spy(provider, 'triangle');
    forward(receiver, provider, methods);

    t.ok(
        (isMethod(receiver, 'square') && isMethod(receiver, 'triangle')), 
        'When calling forward(receiver, provider, methods) : the receiver should proxy a subset of the provider\'s methods'
    );

    receiver.square();

    receiver.triangle();

    t.ok(
        (spySquare.calledOnce && spyTriangle.calledOnce), 
        'Calling forwarded methods on the receiver should call the same methods on the provider'
    );

    t.end();
});


test('Forwarding all of the provider\'s methods', function(t) {
    var receiver, provider, spyCircle, spySquare, spyTriangle;

    receiver = {};

    provider = {
        'circle': function circle(){},
        'square': function square(){},
        'triangle': function triangle(){}
    };

    spyCircle = sinon.spy(provider, 'circle');
    
    spySquare = sinon.spy(provider, 'square');

    spyTriangle = sinon.spy(provider, 'triangle');

    forward(receiver, provider);

    t.ok(
        (isMethod(receiver, 'circle') && isMethod(receiver, 'square') && isMethod(receiver, 'triangle')), 
        'When calling forward(receiver, provider) : the receiver should proxy all of the provider\'s methods'
    );

    receiver.circle();
    
    receiver.square();

    receiver.triangle();

    t.ok(
        (spyCircle.calledOnce && spySquare.calledOnce && spyTriangle.calledOnce), 
        'Calling forwarded methods on the receiver should call the same methods on the provider'
    );

    t.end();
});

function isMethod(obj, prop) {
    return (typeof obj[prop] === 'function');
}
