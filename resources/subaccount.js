'use strict';

var root = '/subaccount';

module.exports = {

  /*
  Create subaccount
  @param: business_name, settlement_bank, account_number, percentage_charge
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['business_name*', 'settlement_bank*', 'account_number*', 'percentage_charge*']
    },

  /*
  Get subaccount
  */
  get: {
      method: 'get',
      endpoint: [root, '/{id_or_slug}'].join(''),
      args: ['id_or_slug']
    },

  /*
  List subaccount
  */
  list: {
      method: 'get',
      endpoint: root
    },

  /*
  List supported banks
  */
  listBanks: {
      method: 'get',
      endpoint: '/bank'
    },

  /*
  Update subaccount
  @param: business_name, settlement_bank, account_number, percentage_charge
  */
  update: {
      method: 'put',
      endpoint: [root, '/{id_or_slug}'].join(''),
      params: ['business_name', 'settlement_bank', 'account_number', 'percentage_charge'],
      args: ['id_or_slug']
    }
};
