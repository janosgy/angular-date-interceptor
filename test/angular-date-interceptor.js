'use strict';

describe('angularDateInterceptor', function () {
  var interceptor,
    httpProvider,
    httpBackend,
    http;

  beforeEach(module('angularDateInterceptor', function($httpProvider){
    httpProvider = $httpProvider;
  }));

  beforeEach(inject(function (angularDateInterceptor, $httpBackend, $http) {
    interceptor = angularDateInterceptor;
    httpBackend = $httpBackend;
    http = $http;
  }));

  it('should be defined', function () {
    expect(interceptor).toBeDefined();
  });

  it('should be an interceptor', function () {
    expect(httpProvider.interceptors).toContain('angularDateInterceptor');
  });

  it('should parse date from an object', function (done) {
    var baseDate = new Date(),
      response;

    httpBackend.whenGET('/singleDate').respond(200, {
      testDate: baseDate.toJSON()
    });
    http.get('/singleDate').success(function(data) {
      response = data;
      done();
    });
    httpBackend.flush();

    expect(angular.isDate(response.dob)).toBe(true);
    expect(response.testDate.getTime()).toEqual(baseDate.getTime());
  });
});
