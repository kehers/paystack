/*
Paystack API wrapper
@author Obembe Opeyemi <@kehers>
*/

'use strict';

var
    request = require('request')
    , root = 'https://api.paystack.co'
;

var resources = {
  customer: require('./resources/customer'),
  plan: require('./resources/plan'),
  transaction: require('./resources/transaction'),
  page: require('./resources/page'),
  subscription: require('./resources/subscription')
}

function Paystack(key) {
  if (!(this instanceof Paystack)) {
    return new Paystack(key);
  }

  this.key = key;
  this.importResources();
}

Paystack.prototype = {

  extend:  function(params) {

    return (function() {

      // Convert argument to array
      var args = new Array(arguments.length);
      var l = args.length;
      for(var i = 0; i < l; ++i) {
        args[i] = arguments[i];
      }

      // Check for callback
      var callback;
      if (l > 0) {
        l--;
        // I expect it to be the last argument
        if (args[l].constructor === Function)
          callback = args[l];
        args.splice(l, 1);
      }

      var body, qs;
      var method = params.method;
      // todo: Validate possible values of method (get, post, put...)
      var endpoint = [root, params.endpoint].join('');

      // Get arguments in endpoint => {id} in customer/{id}
      var argsInEndpoint = endpoint.match(/{[^}]+}/g);
      if (argsInEndpoint) {
        l = argsInEndpoint.length;
        // Do we have one or more?
        if (l > 0) {
          // Confirm resource declaration good
          if (!Array.isArray(params.args)) {
            // error
            throw new Error('Resource declaration error');
          }

          // Confirm user passed the argument to method
          // and replace in endpoint
          var match, index;
          for (var i=0;i<l;i++) {
            match = argsInEndpoint[i].replace(/\W/g, '');
            index = params.args.indexOf(match);
            if (index != -1) {
              if (!args[index]) {
                // error
                throw new Error('Resource declaration error');
              }

              // todo: args[index] must be string or int

              endpoint = endpoint.replace(new RegExp(argsInEndpoint[i]), args[index]);
              args.splice(index, 1);
            }
          }
        }
      }

      // Add post/put/[delete?] body
      if (args[0]) {
        if (method == 'post' || method == 'put') {
          // Body
          body = args[0];
        }
        else if (method == 'get') {
          qs = args[0];
        }
      }

      // Make request
      var options = {
        url: endpoint,
        json: true,
        method: method.toUpperCase(),
        headers: {
          'Authorization': ['Bearer ', this.key].join('')
        }
      }

      if (body)
        options.body = body;

      if (qs)
        options.qs = qs;

      request(options, function(error, response, body) {

        // return body
        if (callback){

          // Error from API??
          if (!body.status) {
            error = body;
            body = null;
          }

          return callback(error, body);
        }
      });

    }).bind(this); // bind, because access to Paystack object
  },

  importResources: function() {
    var anon;
    for (var j in resources) {
      anon = function(){};
      for(var i in resources[j]) {
        anon.prototype[i] = this.extend(resources[j][i]);
      }
      Paystack.prototype[j] = new anon();
    }
  }
};


module.exports = Paystack;
