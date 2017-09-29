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

    resolve_account_number: {
        method: 'get',
        path: [root, '/resolve'].join(''),
        params: ['account_number*', 'bank_code*']
    },

    resolve_bin: {
        method: 'get',
        path: '/decision/bin/{bin}'
    }

}
