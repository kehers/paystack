'use strict';

var root = '/customer';

module.exports = {

  /*
  Create customer
  @param: first_name, last_name, email, phone
  */
  create: {
      method: 'post',
      path: root,
      params: ['first_name', 'last_name', 'email*', 'phone']
    },

  /*
  Get customer
  */
  get: {
      method: 'get',
      path: [root, '/{id}'].join('')
  },

  /*
  List customers
  */
  list: {
      method: 'get',
      path: root
    },

  /*
  Update customer
  @param: first_name, last_name, email, phone
  */
  update: {
      method: 'put',
      path: [root, '/{id}'].join(''),
      params: ['first_name', 'last_name', 'email', 'phone']
    },

  /*
  White/Blacklist customer
  @param: customer, risk_action ('allow' to whitelist or 'deny' to blacklist)
  */
  setRiskAction: {
    method: 'post',
    path: [root, '/set_risk_action'].join(''),
    params: ['customer*', 'risk_action']
  }
};
