'use strict';

describe('angularDateInterceptor', function () {
  var interceptor,
    httpProvider;

  beforeEach(module('angularDateInterceptor', function($httpProvider){
    httpProvider = $httpProvider;
  }));

  beforeEach(inject(function (angularDateInterceptor) {
    interceptor = angularDateInterceptor;
  }));

  it('should be defined', function () {
    expect(interceptor).toBeDefined();
  });

  it('should be an interceptor', function () {
    expect(httpProvider.interceptors).toContain('angularDateInterceptor');
  });
});
