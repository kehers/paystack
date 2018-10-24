'use strict';

var root = '/transfer';

module.exports = {

  /*
  Create transfer recipient
  @param: type, name, metadata, account_number, bank_code, currency, description
  */
  create: {
    method: 'post',
    endpoint: root,
    params: ['source*', 'amount*', 'currency', 'reason', 'recipient*', 'reference']
  },

  /*
  List transfer recipients
  */
  list: {
    method: 'get',
    endpoint: root
  },

  /*
  Fetch transfer
  */
  get: {
    method: 'get',
    endpoint: [root, '/{id}'].join(''),
    args: ['id']
  },

  /*
  White/Blacklist customer
  @param: customer, risk_action ('allow' to whitelist or 'deny' to blacklist)
  */
  finalize: {
    method: 'post',
    endpoint: [root, '/finalize_transfer'].join(''),
    params: ['transfer_code*', 'otp']
  },
};
