const nodemailer = require("nodemailer");
const { uuid } = require("uuidv4");
const users = require("../modules/user");
module.exports = async (email) => {
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "wizmgbrown@gmail.com",
      pass: require("../config/keys.json").pass // naturally, replace both with your real credentials or an application-specific password
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
    text: `go to this link to verify your account: \n http://localhost:/api/users/verify/${verificationCode}`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      return {state : false ,  data : info};
    } else {
      return {state : true , data : info};
    }
  });
};