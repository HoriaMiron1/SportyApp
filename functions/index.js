// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });
// const sendEmail = require('./sendEmail'); // doesn't exist yet
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

admin.initializeApp();

// const sendEmail = https.onRequest((req, res) => {
//   res.send({ status: 200 });
// });

// module.exports = sendEmail;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sportyappteam@gmail.com',
    pass: 'bvbcrmnublifodmc',
  },
});

exports.sendEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    const { dest, message, subject } = request.query;

    const mailOptions = {
      from: 'sportyappteam@gmail.com',
      to: dest,
      subject: subject,
      text: `${message} \nEmail: ${sender.toLowerCase()}`,
    };

    return transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return response.status(500).send({
          data: {
            status: 500,
            message: error.toString(),
          },
        });
      }

      return response.status(200).send({
        data: {
          status: 200,
          message: 'sent',
        },
      });
    });
  });
});
