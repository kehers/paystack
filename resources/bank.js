'use strict';

var root = '/bank';

module.exports = {
    /*
        List supported banks
    */
    list: {
        method: 'get',
        path: root,
        params: ['perPage', 'page']
    },

    resolveAccountNumber: {
        method: 'get',
        path: [root, '/resolve'].join(''),
        params: ['account_number*', 'bank_code*']
    },

    resolveBin: {
        method: 'get',
        path: '/decision/bin/{bin}'
    }, 

    resolveBvn: {
        method: 'get',
        path: [root, '/resolve_bvn/{bvn}'].join('')
    }

}
