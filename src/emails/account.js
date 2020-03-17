const sgMail = require('@sendgrid/mail');
require('dotenv').config();
// process.env.SENDGRID_API_KEY;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: process.env.EMAIL,
  from: process.env.EMAIL,
  subject: 'Test email',
  text: 'did this work?'
};

(async () => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error.toString());
  }
})();
