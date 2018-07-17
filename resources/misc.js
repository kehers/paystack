	'use strict';

// Miscellanous functions have different endpoints

module.exports = {

	/*
		List supported banks
	*/
	list_banks: {
		method: 'get',
		endpoint: '/bank',
		params: ['perPage', 'page']
	},
	
	resolve_bin: {
		method: 'get',
		endpoint: '/decision/bin/{id}',
		args: ['id']
	},

  resolve_account_number: {
	  method: 'get',
    endpoint: '/bank/resolve',
    params: ['account_number', 'bank_code']
  }
	
}
