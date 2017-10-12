'use strict';

var root = '/charge';

module.exports = {

  /*
   Tokenize payment instrument before a charge
  */
  tokenize: {
      method: 'post',
      path: [root, '/tokenize'].join(''),
      params: ['email*', 'card*', 'card.number*', 'card.cvv*', 'card.expiry_month*', 'card.expiry_year*']
    },

  /*
   Charge a bank/card/authorization_code
  */
  charge: {
      method: 'get',
      path: root,
      params: ['email*', 'amount*', 
                [
                  ['card*', 'card.number*', 'card.cvv*', 'card.expiry_month*', 'card.expiry_year*'],
                  ['bank*', 'bank.code*', 'bank.account_number*'],
                  "authorization_code*"
                ]
              ]
    },

 /*
  Submit Pin
 */
  submitPin: {
      method: 'post',
      path: [root, '/submit_pin'].join(''),
      params: ['pin*', 'reference*']
  },

 /*
  Submit OTP
 */
  submitOtp: {
    method: 'post',
    path: [root, '/submit_otp'].join('')
  },

  /*
   Submit Phone
  */
  submitPhone: {
      method: 'post',
      path: [root, '/submit_phone'].join('')
  },

  /*
   Submit Birthday
  */
  submitBirthday: {
    method: 'post',
    path: [root, '/submit_birthday'].join('')
  },
  
  /*
   Check charge status
  */
  chargeStatus: {
    method: 'get',
    path: [root, '/{id}'].join('')
  }
  
};
