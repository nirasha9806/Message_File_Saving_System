const UserDetails = require("../models/user-model");
const nodemailer = require("nodemailer");

//Checking the crypto module
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
function encrypt(text) {
  try {
    let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
  } catch (err) {
    console.error("Something went wrong");
    console.error(err);
  }
}

// Decrypting text
function decrypt(text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

//add user Details
exports.addUsers = async (req, res) => {
  const {
    userName,
    userEmail,
    userPassword: String,
    userType,
    status,
  } = req.body;

  const userPassword = encrypt(String);
  //TODO: Decrypt method
  const decryptPassword = decrypt(userPassword);

  const userDetails = await UserDetails.create({
    userName,
    userEmail,
    userPassword,
    userType,
    status,
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS2,
    },
  });

  var mailOptions = {
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
