const sgMail = require('@sendgrid/mail');
require('dotenv').config();
// process.env.SENDGRID_API_KEY;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const msg = {
//   to: process.env.EMAIL,
//   from: process.env.EMAIL,
//   subject: 'Test email',
//   text: 'did this work?'
// };

// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.log(error.toString());
//   }
// })();

const sendWelcomeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: 'Welcome!',
    text: `Thanks for ${name} joining! Welcome to our task manager application that allows you to keep track of your own tasks!`
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error.toString());
  }
};

const sendGoodbyeEmail = async (email, name) => {
  const msg = {
    to: email,
    from: process.env.EMAIL,
    subject: 'Sorry to see you go!',
    text: `Thanks ${name} for giving us a chance! Let us know if there is anything we can do better. We are sad to see you go and wish you luck!`
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    console.log(error.toString());
  }
};

module.exports = {
  sendWelcomeEmail,
  sendGoodbyeEmail
};
