'use strict';

var root = '/page';

module.exports = {

  /*
  Create page
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['name', 'description', 'amount']
    },

  /*
  Get page
  */
  get: {
      method: 'get',
      endpoint: [root, '/{id}'].join(''),
      args: ['id']
  },

  /*
  List page
  */
  list: {
      method: 'get',
      endpoint: root
    },

  /*
  Update page
  */
  update: {
      method: 'put',
      endpoint: [root, '/{id}'].join(''),
      params: ['name', 'description', 'amount', 'active'],
      args: ['id']
    },

    /*
    Check slug availability
    */
    checkSlug: {
        method: 'get',
        endpoint: [root, '/check_slug_availability/{slug}'].join(''),
        args: ['slug']
      }
};
