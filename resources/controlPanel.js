'use strict';

var root = '/integration';

module.exports = {

  /*
   Fetch Payment Session Timeout
  */
  fetchPaymentTimeout: {
      method: 'get',
      path: [root, '/payment_session_timeout'].join('')
    },

  /*
   Update Payment Session Timeout
  */
  updatePaymentTimeout: {
      method: 'put',
      path: [root, '/payment_session_timeout'].join('')
    }

};
