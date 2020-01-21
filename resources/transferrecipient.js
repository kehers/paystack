'use strict';

var root = '/transferrecipient';

module.exports = {

  /*
  Create transferrecipient
  @param: type, name, account_number, bank_code, currency, description
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['type*', 'name*', 'account_number*', 'bank_code*', 'currency', 'description']
    },

  /*
  List transferrecipients
  */
  list: {
      method: 'get',
      endpoint: root,
      params: ['perPage', 'page']
    },
  
  /*
  Update transferrecipient
  @params: name, email
  */  
  update: {
      method: 'put',
      endpoint: [root, '/{id}'].join(''),
      params: ['name', 'email'],
      args: ['id']
    },

  /*
  Delete transferrecipient
  */  
  delete: {
      method: 'delete',
      endpoint: [root, '/{id}'].join(''),
      args: ['id']
    }
};
