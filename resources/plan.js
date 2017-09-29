'use strict';

var root = '/plan';

module.exports = {

  /*
  Create plan
  */
  create: {
      method: 'post',
      path: root,
      params: ['name*', 'description', 'amount*', 'interval*', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency']
    },

  /*
  Get plan
  */
  get: {
      method: 'get',
      path: [root, '/{id}'].join('')
  },

  /*
  List plan
  */
  list: {
      method: 'get',
      path: root
    },

  /*
  Update plan
  */
  update: {
      method: 'put',
      path: [root, '/{id}'].join(''),
      params: ['name', 'description', 'amount', 'interval', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency']
    }
};
