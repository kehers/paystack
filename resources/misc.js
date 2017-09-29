'use strict';

// Miscellanous functions have different endpoints

module.exports = {

	/*
		List supported banks
	*/
	list_banks: {
		method: 'get',
		path: '/bank',
		params: ['perPage', 'page']
	},

	resolve_bin: {
		method: 'get',
		path: '/decision/bin/{bin}'
	}

}
