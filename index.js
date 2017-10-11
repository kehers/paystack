/*
Paystack API wrapper
@author Obembe Opeyemi <@kehers>
*/

'use strict';

var 
    request = require('request'),
    baseUrl = 'https://api.paystack.co',
    acceptedMethods = [ "get", "post", "put" ],
    Promise = require('promise')
;

var resources = {
  customer: require('./resources/customer'),
  plan: require('./resources/plan'),
  transaction: require('./resources/transaction'),
  page: require('./resources/page'),
  subscription: require('./resources/subscription'),
  subaccount: require('./resources/subaccount'),
  settlements: require('./resources/settlements'),
  misc: require('./resources/misc'),
  bank: require('./resources/bank')
}

function Paystack(key) {
  if (!(this instanceof Paystack)) {
    return new Paystack(key);
  }

  this.key = key || process.env["PAYSTACK_SECRET_KEY"];
  this.importResources();
}

Paystack.prototype = {

  extend:  function(endpoint) {
  	// This looks more sane.
    var secretKey = this.key;

    return function(){
      // Convert argument to array
      var args = new Array(arguments.length);
      var l = args.length;
      for(var i = 0; i < l; ++i) {
        args[i] = arguments[i];
      }

      // Check if last argument is supplied and is a valid callback function & Pull it out from the array
      var callback = l > 0 && typeof args.slice(l-1)[0] === "function" ? args.splice(l-1)[0] : undefined;

      // method checking
      if (acceptedMethods.indexOf(endpoint.method) < 0) {
        throw new Error("Method  - " + endpoint.method + " - not Allowed! - Resource declaration error")
      }

      var method = endpoint.method;
      var url = [baseUrl, endpoint.path].join('');

      // First check path parameters (e.g {id} in customer/{id}) before checking post body or query string paramters
      // Pull out all path parameters from url into array
      var argsInEndpoint = url.match(/{[^}]+}/g);
      if (argsInEndpoint) {
        l = argsInEndpoint.length;

        // Do we have one or more?
        if (l > 0) {
          // Confirm user passed the argument to method
          // and replace in endpoint
          for (var i=0;i<l;i++) {
            //get the argument name from the path defined in resource
            var argumentName = argsInEndpoint[i].replace(/\W/g, '');

            if (!args[i]) {
              // caller did not pass in this particular argument
              throw new Error('Required path parameter ommited - ' + argumentName);
            }

            //args[index] must be string or int
            var argumentValue = args[i];
            var valueType = typeof argumentValue;
            if (valueType !== 'string' && valueType !== 'number') {
              throw new Error('Invalid path parameter argument for ' + argumentName + '. Expected string or number. Found ' + valueType);
            }

            url = url.replace(new RegExp(argsInEndpoint[i]), argumentValue);
          }

          //we've replaced all url path parameters with values from args
          //now delete all such used values from args leaving only the optional qs/body parameters as first argument (if exist) in args
          args.splice(0, l);
        }
      }

      var body, qs;

      // Checking for required params;
      if(endpoint.params) {
        var parametersList = endpoint.params;
        var parametersReceived = args[0]; //should now be first argument, having removed all path arguments

        parametersList.filter(function(parameterName, index, array) {
          if(parameterName.indexOf("*") === -1) {
            // Not required
            return;
          }
          parameterName = parameterName.replace("*", "");

          if(!(parameterName in parametersReceived)) {
            throw new Error("Required parameter ommited - " + parameterName);
          }
          return;
        });

        if (method == 'post' || method == 'put') {
          // Body
          body = parametersReceived;
        }
        else if (method == 'get') {
          qs = parametersReceived;
        }
      }

      // Make request
      var options = {
        url: url,
        json: true,
        method: method.toUpperCase(),
        headers: {
          'Authorization': ['Bearer ', secretKey].join('')
        }
      }

      if (body)
        options.body = body;

      if (qs)
        options.qs = qs;

      return new Promise(function (fulfill, reject){
        request(options, function(error, response, body) {
          // return body
          if (error){
            reject(error);
          }
          else if(!body.status){
            // Error from API??
            error = body;
            body = null;
            reject(error);
          }
          else{
            fulfill(body);
          }
        });
      }).then(function(value) {
      	if(callback) {
      		return callback(null, value);
      	}
      	return value;
      }).catch(function(reason) {
      	if(callback) {
      		return callback(reason, null);
      	}
      	return reason;
      });
    }
  },

  importResources: function() {
    var resourceFunction, resource;
    // Looping over all resources
    // each resource contains a collection of endpoints
    for (var resourceName in resources) {
      //get the resource object
      resource = resources[resourceName];
      // Creating a surrogate function
      resourceFunction = function(){};

      // Looping over the endpoints of each resource
      // each endpoint contains information for validating and calling the endpoint
      for(var endpoint in resource) {
        resourceFunction.prototype[endpoint] = this.extend(resource[endpoint]);
      }

      Paystack.prototype[resourceName] = new resourceFunction();
    }
  }
};


module.exports = Paystack;
