const UserDetails = require("../models/user-model");
const nodemailer = require("nodemailer");

//Checking the crypto module
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const length = 10;

//auto password generated
function generatePassword() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log(result);
  return result;
}

//Encrypting text
function encrypt(text) {
  try {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
    
  } catch (err) {
    console.error("Something went wrong");
    console.error(err);
  }
}

// Decrypting text
function decrypt(text) {
  try{
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();

  }catch(err){
    console.error("Something went wrong");
    console.error(err);
  }
}

//add user Details
exports.addUsers = async (req, res) => {
  const {
    userName,
    userEmail,
    userType,
    status
  } = req.body;

  const userPassword = encrypt(generatePassword());
  const decryptPassword = decrypt(userPassword);

  console.log(decryptPassword);

  const userDetails = await UserDetails.create({
    userName,
    userEmail,
    userPassword,
    userType,
    status,
  });

  //create a node mailer...
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `Welcome to ABC Company! ${userEmail}`,
    text: `Dear ${userName},\nWe are excited to welcome you to ABC Company!
    \nUsername: ${userName}
    \nPassword: ${decryptPassword} \n\n 
    To ensure ABC Company stays a safe and fun place to work we ask you to login using this username and password.\n
    We will never spam your inbox.\n\n

    You have agreed to the Terms of Service, the Privacy Policy, and the Conditions of the Icebreaker System.\n\n
    
    Thanks,\n
    ABC Company`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  if (!userDetails) {
    res.status(401).json({
      success: false,
      message: "Add User was failed",
    });
  }

  res.status(200).json({
    success: true,
    userDetails,
  });
};

//get user details
exports.getAllUsers = async (req, res, next) => {
  const userDetails = await UserDetails.find();

  if (!userDetails) {
    return res.status(404).json({
      success: false,
      message: "All User details Not Found",
    });
  }

  res.status(200).json({
    success: true,
    userDetails,
    message: "All Users",
  });
};
