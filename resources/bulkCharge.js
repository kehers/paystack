'use strict';

var root = '/bulkcharge';

module.exports = {

  /*
   Initiate a bulk charge
  */
  initiate: {
      method: 'post',
      path: root
  },

  /*
   List Batches
  */
  list: {
      method: 'get',
      path: root
  },

 /*
  Get Batch
 */
  getBatch: {
      method: 'get',
      path: [root, '/{id}'].join('')
  },

 /*
  Get Charges in Batch
 */
  getCharges: {
    method: 'get',
    path: [root, '/{id}/charges'].join('')
  },

  /*
   Pause Batch
  */
  pauseBatch: {
      method: 'get',
      path: [root, '/pause/{id}'].join('')
  },

  /*
   Resume Batch
  */
  resumeBatch: {
    method: 'get',
    path: [root, '/resume/{id}'].join('')
  }
  
};
