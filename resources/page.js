'use strict';

var root = '/page';

module.exports = {

  /*
  Create page
  */
  create: {
      method: 'post',
      path: root,
      params: ['name*', 'description', 'amount']
    },

  /*
  Get page
  */
  get: {
      method: 'get',
      path: [root, '/{id}'].join('')
  },

  /*
  List page
  */
  list: {
      method: 'get',
      path: root
    },

  /*
  Update page
  */
  update: {
      method: 'put',
      path: [root, '/{id}'].join(''),
      params: ['name', 'description', 'amount', 'active']
    },

   /*
   Check Slug Avaliability
   */
  slug: {
  	 method: 'get',
  	 path: [root, '/check_slug_availability'].join(''),
  	 params: ['slug*']
  }
};
