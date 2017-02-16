/*
Paystack API wrapper
@author Obembe Opeyemi <@kehers>
*/

'use strict';

var
    request = require('request')
    ,root = 'https://api.paystack.co'
;

var resources = {
  customer: require('./resources/customer'),
  plan: require('./resources/plan'),
  transaction: require('./resources/transaction'),
  page: require('./resources/page'),
  subscription: require('./resources/subscription'),
  subaccount: require('./resources/subaccount'),
  misc: require('./resources/misc')
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
  	// This looks more sane.
  	var self = this;
    
    return function() {
	  
      // Convert argument to array
      var args = new Array(arguments.length);
      var l = args.length;
      for(var i = 0; i < l; ++i) {
        args[i] = arguments[i];
      }
	
      // Check for callback & Pull it out from the array
      var callback = l > 0 && typeof args.slice(l-1)[0] === "function" ? args.splice(l-1)[0] : "undefined"; 
     
      var body, qs;
      
      // quick fix - method checking 
      var method = params.method in {"get":'', "post":'', "put":''}
      			   ? params.method
      			   : (function () { throw new Error("Method not Allowed! - Resource declaration error") })()
      var endpoint = [root, params.endpoint].join('');
	  
	  // Checking for required params;
	  if(params.params) {

	  	var paramList = params.params;
	 
	  	// Pull body passed
	  	var body = args.length === 2 ? args[1] : args[0];
	  	paramList.filter(function(item, index, array) {
	  		if(item.indexOf("*") === -1) {
	  			// Not required
	  			return;
	  		}
	  		item = item.replace("*", "");
	  		
	  		if(!(item in body)) {
	  			throw new Error("Required Parameters Ommited - " + item);
	  		}
	  		return;
	  		
	  	});
	  }
	  
	  
	  
      // Get arguments in endpoint e.g {id} in customer/{id} and pull
      // out from array
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
          'Authorization': ['Bearer ', self.key].join('')
        }
      }

      if (body)
        options.body = body;

      if (qs)
        options.qs = qs;
	
	request(options, function(error, response, body) {
    	// request module error as not been previously handled properly.
    	// To see this error try running this module without internet connection
        if(!error) {
        	if(callback){
        		if(response.statusCode > 201) {
        			error = body;
        			body = null;
        		}
        		        	
				return callback(error, body);
		   }
        	// gc would throw response away
       }
        throw new Error(error);
      });

    }
  },

  importResources: function() {
    var anon;
    // Looping over all resources
    for (var j in resources) {
      // Creating a surrogate function
      anon = function(){};	
      // Looping over the properties of each resource
      for(var i in resources[j]) {	
        anon.prototype[i] = this.extend(resources[j][i]);
      }
      Paystack.prototype[j] = new anon();
    }
  }
};


module.exports = Paystack;
