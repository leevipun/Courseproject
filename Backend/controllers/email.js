const nodemailer = require("nodemailer");
const pass = process.env.EMAILPASS;

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "suomenlehtikauppa@outlook.com",
    pass: pass,
  },
});

module.exports = transporter;
