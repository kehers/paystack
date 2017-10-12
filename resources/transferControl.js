'use strict';

var root = '/transfer';

module.exports = {
  /* 
   check your balance
  */
  checkBalance: {
    method: 'get',
    path: root,
  },
  
  /* 
   Resend OTP for transfer
  */
  resendOtp: {
    method: 'post',
    path: [root, '/resend_otp'].join(''),
    params: ['transfer_code*', 'reason*']
  },
  
  /* 
   Disable OTP
  */
  disableOtp: {
     method: 'post',
     path: [root, '/disable_otp'].join('')
  },
  
  /* 
   Finalize Disabling OTP 
  */
  finalizeDisableOtp: {
     method: 'post',
     path: [root, '/disable_otp_finalize'],
     params: ['otp*']
  },
  
  /* 
   Enable OTP 
  */
  enableOtp: {
     method: 'post',
     path: [root, '/enable_otp'].join('')
  }
};