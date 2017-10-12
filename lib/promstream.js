"use strict";
// Customized interface for  promisifying & streaming a http data source with requests.
const request = require('request')
const Promise = require('promise')

module.exports = promstream

function promstream(options, callback) {
  
  options.encoding = "utf8"

  function promstream() {}

  var httpRequest;

  let datasource = new Promise(function(fulfill, reject){
      httpRequest = request(options,  function callback(error, response, body) {
        if (error){
          // Network Error
          reject(error);
        }
        else if(!body.status){ 
          // API Error
          error = body;
          body = null;
          reject(error);
        }
        else{
          fulfill(body);
        }
      })
  	})

  // Promise Interface 
  promstream.prototype.then = function (onFulfillment, onRejection) {
    return datasource.then(onFulfillment, onRejection)
  }

  promstream.prototype.catch = function (fn) {
    return datasource.catch(fn)
  }

  promstream.prototype.reject = function (error) {
    return new Promise.reject(error)
  }

  promstream.prototype.resolve = function (data) {
    return new Promise.resolve(data)
  }

  // Stream Interface
  promstream.prototype.on = function (eventName, callback) {
    httpRequest.on(eventName, callback)
  }

  promstream.prototype.pipe = function(destSrc) {
    httpRequest.pipe(destSrc)
  }

  promstream.prototype.unpipe = function() {
    httpRequest.unpipe()
  }

  ///let mypromstream = new promstream();

  if(callback) {
    return datasource.then(callback, undefined)
  }

  return new promstream(); //mypromstream;
}