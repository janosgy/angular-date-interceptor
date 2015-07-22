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

  it('should have angularDateInterceptor be defined', function () {
    expect(interceptor).toBeDefined();
  });

  it('should have angularDateInterceptor as an interceptor', function () {
    expect(httpProvider.interceptors).toContain('angularDateInterceptor');
  });
});
