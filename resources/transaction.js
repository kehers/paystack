'use strict';

var root = '/transaction';

module.exports = {

  /*
  Initialize transaction
  */
  initialize: {
      method: 'post',
      endpoint: [root, '/initialize'].join(''),
      params: ['reference', 'amount*', 'email*', 'plan']
    },

  /*
  Export transactions
  */
  export: {
      method: 'get',
      endpoint: [root, '/export'].join(''),
      params: ['from', 'to', 'settled', 'payment_page']
    },

  /*
  Charge authorization
  */
  charge: {
      method: 'post',
      endpoint: [root, '/charge_authorization'].join(''),
      params: ['reference', 'authorization_code*', 'email*', 'amount*']
    },

  /*
  Charge token
  */
  chargeToken: {
      method: 'post',
      endpoint: [root, '/charge_token'].join(''),
      params: ['reference', 'token*', 'email', 'amount']
    },

  /*
  Get transaction
  */
  get: {
      method: 'get',
      endpoint: [root, '/{id}'].join(''),
      args: ['id']
  },

  /*
  List transactions
  */
  list: {
      method: 'get',
      endpoint: root
    },

  /*
  Get totals
  */
  totals: {
      method: 'get',
      endpoint: [root, '/totals'].join('')
    },

  /*
  Verify transaction
  */
  verify: {
      method: 'get',
      endpoint: [root, '/verify/{reference}'].join(''),
      args: ['reference']
    },

};
