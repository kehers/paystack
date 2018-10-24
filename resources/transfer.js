'use strict';

var root = '/transfer';

module.exports = {

  /*
  Create transfer
  @param: source, amount, currency, reason, recipient, reference
  */
  create: {
    method: 'post',
    endpoint: root,
    params: ['source*', 'amount*', 'currency', 'reason', 'recipient*', 'reference']
  },

  /*
  List transfers
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
  Finalize transfer
  @param: transfer_code, otp
  */
  finalize: {
    method: 'post',
    endpoint: [root, '/finalize_transfer'].join(''),
    params: ['transfer_code*', 'otp']
  },
};
