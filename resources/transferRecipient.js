'use strict';

var root = '/transferrecipient';

module.exports = {
  /* 
   Create a New recipient
  */
  create: {
    method: 'post',
    path: root,
    params: ['type*', 'name*', 'account_number*', 'bank_code*']
  },
  
  /* 
   List Recipients
  */
  list: {
    method: 'get',
    endpoint: root,
  }

};
