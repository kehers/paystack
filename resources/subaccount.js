'use strict';

var root = '/subaccount';

module.exports = {

  /*
  Create subaccount
  @param: business_name, settlement_bank, account_number, percentage_charge
  */
  create: {
      method: 'post',
      path: root,
      params: ['business_name*', 'settlement_bank*', 'account_number*', 'percentage_charge*']
    },

  /*
  Get subaccount
  */
  get: {
      method: 'get',
      path: [root, '/{id_or_slug}'].join('')
    },

  /*
  List subaccount
  */
  list: {
      method: 'get',
      path: root
    },

  /*
  List supported banks
  */
  listBanks: {
      method: 'get',
      path: '/bank'
    },

  /*
  Update subaccount
  @param: business_name, settlement_bank, account_number, percentage_charge
  */
  update: {
      method: 'put',
      path: [root, '/{id_or_slug}'].join(''),
      params: ['business_name', 'settlement_bank', 'account_number', 'percentage_charge']
    }
};
