'use strict';

var root = '/transfer';

module.exports = {

  /*
   Initiate a transfer
   @param: source, amount, recipient
  */
  initiate: {
      method: 'post',
      path: root,
      params: ['source*', 'amount*', 'recipient*']
    },

  /*
   List transfers
  */
  list: {
      method: 'get',
      path: root
    },

 /*
  Get transfers
 */
  get: {
      method: 'get',
      path: [root, '/{id}'].join('')
  },

  /*
  Finalize transfer
  @param: transfer_code, otp
  */
  finalize: {
      method: 'post',
      path: [root, '/finalize_transfer'].join(''),
      params: ['transfer_code*', 'otp*']
    },

  /*
  White/Blacklist customer
  @param: customer, risk_action ('allow' to whitelist or 'deny' to blacklist)
  */
  initiateBulkTransfer: {
    method: 'post',
    path: [root, '/bulk'].join(''),
    params: ['source*']
  }
};
