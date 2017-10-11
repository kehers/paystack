'use strict';

var root = '/transaction';

module.exports = {

  /*
  Initialize transaction
  */
  initialize: {
      method: 'post',
      path: [root, '/initialize'].join(''),
      params: ['reference', 'amount*', 'email*', 'plan']
    },

  /*
  Export transactions
  */
  export: {
      method: 'get',
      path: [root, '/export'].join(''),
      params: ['from', 'to', 'settled', 'payment_page']
    },

  /*
  Charge authorization
  */
  charge: {
      method: 'post',
      path: [root, '/charge_authorization'].join(''),
      params: ['reference', 'authorization_code*', 'email*', 'amount*']
    },

  /*
  Charge token
  */
  chargeToken: {
      method: 'post',
      path: [root, '/charge_token'].join(''),
      params: ['reference', 'token*', 'email', 'amount']
    },

  /*
  Get transaction
  */
  get: {
      method: 'get',
      path: [root, '/{id}'].join('')
  },

  /*
  List transactions
  */
  list: {
      method: 'get',
      path: root
    },

  /*
  Get totals
  */
  totals: {
      method: 'get',
      path: [root, '/totals'].join('')
    },

  /*
  Verify transaction
  */
  verify: {
      method: 'get',
      path: [root, '/verify/{reference}'].join('')
    },

};
