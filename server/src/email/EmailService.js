const nodemailer = require("nodemailer");
const transporter = require("../config/emailTransporter");
const config = require("config");

const sendAccountActivationDriver = async (email, token) => {
  const info = await transporter.sendMail({
    ...config.get("mailConfig"),
    to: email,
    subject: "Account Activation",
    text: "Activation Email",
    html: `
    <div>
      <h>Please click below link to activate your account</h>
    </div>
    <div>
      <a href="http://localhost:5001/driver/auth?token=${token}">Activate</a>
    </div>
    Token is ${token}`,
  });
};

const sendAccountActivationAdmin = async (email, token) => {
  const info = await transporter.sendMail({
    ...config.get("mailConfig"),
    to: email,
    subject: "Account Activation",
    text: "Activation Email",
    html: `
    <div>
      <h>Please click below link to activate your account</h>
    </div>
    <div>
      <a href="http://localhost:5001/admin/auth?token=${token}">Activate</a>
    </div>
    Token is ${token}`,
  });
};

module.exports = { sendAccountActivationDriver, sendAccountActivationAdmin };
