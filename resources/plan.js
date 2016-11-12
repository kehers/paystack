'use strict';

var root = '/plan';

module.exports = {

  /*
  Create plan
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['name*', 'description', 'amount*', 'interval*', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency']
    },

  /*
  Get plan
  */
  get: {
      method: 'get',
      endpoint: [root, '/{id}'].join(''),
      args: ['id']
  },

  /*
  List plan
  */
  list: {
      method: 'get',
      endpoint: root
    },

  /*
  Update plan
  */
  update: {
      method: 'put',
      endpoint: [root, '/{id}'].join(''),
      params: ['name', 'description', 'amount', 'interval', 'send_invoices', 'send_sms', 'hosted_page', 'hosted_page_url', 'hosted_page_summary', 'currency'],
      args: ['id']
    }
};
