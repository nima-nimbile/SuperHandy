const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = express.Router();
const nodemailer = require("nodemailer");


const contactEmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "superhandyteam3@gmail.com",
    pass: "vbzmoygibbagydky",
  },
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});


router.post('/', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: "superhandyteam3@gmail.com",
    to: "nima.mohamed@hotmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

module.exports = router;