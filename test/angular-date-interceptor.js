'use strict';

describe('angularDateInterceptor', function() {
  var interceptor;

  beforeEach(module('angularDateInterceptor'));

  beforeEach(inject(function ($rootScope, angularDateInterceptor) {
    interceptor = angularDateInterceptor;
  }));

  it('should have angularDateInterceptor be defined', function () {
    expect(interceptor).toBeDefined();
  });

});
