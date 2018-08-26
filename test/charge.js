let Paystack = require('../index')('sk_test_1a68ac96a0171fb72111a24295d8d31d41c28eed');

(async () => {
	try {
		let payRes = await Paystack.charge.card({
			email: "some@body.nice",
			amount: 10000,
			metadata: {
				custom_fields: [
					{
						value: "makurdi",
						display_name: "Donation for",
						variable_name: "donation_for"
					}
				]
			},
			cvv: "408",
			number: "4084084084084081",
			expiry_month: "01",
			expiry_year: "99",
			pin: '0000'
		});

		console.log(payRes);
	} catch (error) {
		console.log(error);
	}
})();