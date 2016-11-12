'use strict';

var root = '/customer';

module.exports = {

  /*
  Create customer
  @param: first_name, last_name, email, phone
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['first_name', 'last_name', 'email*', 'phone']
    },

  /*
  Get customer
  */
  get: {
      method: 'get',
      endpoint: [root, '/{id}'].join(''),
      args: ['id']
  },

  /*
  List customers
  */
  list: {
      method: 'get',
      endpoint: root
    },

  /*
  Update customer
  @param: first_name, last_name, email, phone
  */
  update: {
      method: 'put',
      endpoint: [root, '/{id}'].join(''),
      params: ['first_name', 'last_name', 'email', 'phone'],
      args: ['id']
    },

  /*
  White/Blacklist customer
  @param: customer, risk_action ('allow' to whitelist or 'deny' to blacklist)
  */
  setRiskAction: {
    method: 'post',
    endpoint: [root, '/set_risk_action'].join(''),
    params: ['customer*', 'risk_action']
  }
};
