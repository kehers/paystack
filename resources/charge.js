


let charge = function () {
	let rq = require('request');
	let root = "https://api.paystack.co/charge";
	
	this.$key =  null;

	// check important parameters
	this.$checkParams = function (type, params) {
		let types = {
			bank: ['email', 'amount', 'account_number', 'code'],
			card: ['email', 'amount', 'number', 'cvv', 'expiry_month', 'expiry_year'],
			authorization_code: ['authorization_code'],
			submit_pin: ['pin', 'reference'],
			submit_otp: ['otp', 'reference']
		}
		let res = { param: null, state: false };

		for (let i = 0; i < types[type].length; i++){
			let param = types[type][i]
			if (params[param] != undefined && params[param] != null) {
				res.param = param;
				res.state = true;
			}
			else {
				res.param = param;
				res.state = false;
				break;
			}
		};

		return res;
	}

	// make request to paystack servers
	this.$makeRequest = function (to, body) {
		let url = [root, to].join('');
		let key = this.$key;

		return new Promise((resolve, reject) => {
			rq(url, {
				json: true,
				method: 'POST',
				headers: {
					'Authorization': ['Bearer ', key].join('')
				},
				body: { ...body }
			}, (error, response, body) => {
				console.log(body);
				if (error) {
					reject(error);
				}
				else if (!body.status) {
					// Error from API??
					error = body.data && body.data.message || body.message;
					body = null;
					reject(error);
				}
				else {
					resolve(body);
				}
			});
		});
	}

	// controllers
	this.bank = function ({ email, amount, metadata, code, account_number, birthday }) {
		return new Promise((resolve, reject) => {
			let paramsCheck = this.$checkParams('bank', {...arguments[0]});

			if (!paramsCheck.state) {
				reject("Required Parameters Ommited - " + paramsCheck.param);
			}
			else {
				let bank = {
					code: code,
					account_number: account_number
				}

				this.$makeRequest('', {
					email: email,
					amount: amount,
					metadata: metadata,
					birthday: birthday,
					bank: {...bank}
				})
				.then(body => resolve(body))
				.catch(error => reject(error));
			}
		});
	}

	this.card = function ({ email, amount, metadata, number, cvv, expiry_month, expiry_year, pin }) {
		return new Promise((resolve, reject) => {
			let paramsCheck = this.$checkParams('card', {...arguments[0]});

			if (!paramsCheck.state) {
				reject("Required Parameters Ommited - " + paramsCheck.param);
			}
			else {
				let card = {
					number: number,
					cvv: cvv,
					expiry_month: expiry_month,
					expiry_year: expiry_year,
				}

				this.$makeRequest('', {
					email: email,
					amount: amount,
					metadata: metadata,
					pin: pin,
					card: {...card}
				})
				.then(body => resolve(body))
				.catch(error => reject(error));
			}
		});
	}

	this.authorizationCode = function ({ authorization_code, pin }) {
		return new Promise((resolve, reject) => {
			let paramsCheck = this.$checkParams("authorization_code", {...arguments[0]});

			if (!paramsCheck.state) {
				reject("Required Parameters Ommited - " + paramsCheck.param);
			}
			else {
				this.$makeRequest('', { ...arguments[0] })
					.then(body => resolve(body))
					.catch(error => reject(error));
			}
		});
	}
	
	this.submitPin = function ({ reference, pin }) {
		return new Promise((resolve, reject) => {
			let paramsCheck = this.$checkParams("submit_pin", {...arguments[0]});

			if (!paramsCheck.state) {
				reject("Required Parameters Ommited - " + paramsCheck.param);
			}
			else {
				this.$makeRequest('/submit_pin', { ...arguments[0] })
					.then(body => resolve(body))
					.catch(error => reject(error));
			}
		});
	}

	this.submitOTP = function ({ reference, otp }) {
		return new Promise((resolve, reject) => {
			let paramsCheck = this.$checkParams("submit_otp", { ...arguments[0] });

			if (!paramsCheck.state) {
				reject("Required Parameters Ommited - " + paramsCheck.param);
			}
			else {
				this.$makeRequest('/submit_otp', { ...arguments[0] })
					.then(body => resolve(body))
					.catch(error => reject(error));
			}
		});
	}
}

module.exports = new charge();