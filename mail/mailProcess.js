const nodemailer = require("nodemailer");
const { uuid } = require("uuidv4");
const users = require("../modules/user");
const config = require("../config/keys.json").mail;
module.exports = async (email) => {
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.email,
      pass: config.password // naturally, replace both with your real credentials or an application-specific password
    }
  });
  const verificationCode = uuid();

  // eslint-disable-next-line no-unused-vars
  await users.update({ verification_code: verificationCode }, {
    where: {
      email: email
    }
  });

  const mailOptions = {
    from: "noreplay@alimny.com",
    to: email,
    subject: "Active your Account",
    text: `go to this link to verify your account: \n http://localhost:2022/api/users/verify/${verificationCode}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return {state : false ,  data : error};
    } else {
      return {state : true , data : info};
    }
  });
};