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
      responseMock = {
        testDate: baseDate.toJSON(),
        isTest: true,
        test: 'Lorem Ipsum'
      };

    httpBackend.whenGET('/singleDate').respond(200, responseMock);
    http.get('/singleDate').success(function(response) {
      expect(angular.isDate(response.testDate)).toBe(true);
      expect(response.testDate.getTime()).toEqual(baseDate.getTime());
      expect(response.isTest).toEqual(responseMock.isTest);
      expect(response.test).toEqual(responseMock.test);
      done();
    });
    httpBackend.flush();
  });

  it('should parse date from a deep object', function (done) {
    var baseDate = new Date(),
      response,
      responseMock = {
        testObj: {
          testDate: baseDate.toJSON()
        }
      };

    httpBackend.whenGET('/singleDate').respond(200, responseMock);
    http.get('/singleDate').success(function(data) {
      response = data;
      expect(angular.isDate(response.testObj.testDate)).toBe(true);
      expect(response.testObj.testDate.getTime()).toEqual(baseDate.getTime());
      done();
    });
    httpBackend.flush();
  });
});
