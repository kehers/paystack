'use strict';

var root = '/transaction';

module.exports = {

  /*
  Initialize transaction
  */
  initialize: {
      method: 'post',
      endpoint: [root, '/initialize'].join(''),
      params: ['reference', 'amount', 'email', 'plan']
    },

  /*
  Charge authorization
  */
  charge: {
      method: 'post',
      endpoint: [root, '/charge_authorization'].join(''),
      params: ['authorization_code', 'email', 'amount']
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
