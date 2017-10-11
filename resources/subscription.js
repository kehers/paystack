'use strict';

var root = '/subscription';

module.exports = {

  /*
  Create subscription
  */
  create: {
      method: 'post',
      path: root,
      params: ['customer*', 'plan*', 'authorization']
    },

  /*
  Disable subscription
  */
  disable: {
      method: 'post',
      path: root,
      params: ['code*', 'token*']
    },

  /*
  Enable subscription
  */
  enable: {
      method: 'post',
      path: root,
      params: ['code*', 'token*']
    },

  /*
  Get subscription
  */
  get: {
      method: 'get',
      path: [root, '/{id_or_subscription_code}'].join('')
  },

  /*
  List subscription
  */
  list: {
      method: 'get',
      path: root
    }

};
