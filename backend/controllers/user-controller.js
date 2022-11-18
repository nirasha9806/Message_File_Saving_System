const User = require('../models/user-model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const length = 10;

//auto password generated
function generatePassword() {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//add user Details
exports.addUsers = async (req, res) => {
  const { username, email, userType } = req.body;

  const userPassword = await generatePassword();

  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  //password hashing
  let hashedPassword = await bcrypt.hash(userPassword, salt);

  let user = new User({
    username: username,
    email: email,
    password: hashedPassword,
    userType: userType,
    status: 0,
  });

  //create a node mailer...
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: `Welcome to ABC Company! ${email}`,
    text: `Dear ${username},\nWe are excited to welcome you to ABC Company!
    \nusername: ${username}
    \nPassword: ${userPassword} \n\n 
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
      console.log('Email sent: ' + info.response);
    }
  });

  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Add User was failed',
    });
  }
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};

//get user details
exports.getAllUsers = async (req, res, next) => {
  const userDetails = await User.find();

  if (!userDetails) {
    return res.status(404).json({
      success: false,
      message: 'All User details Not Found',
    });
  }

  res.status(200).json({
    success: true,
    userDetails,
  });
};

//update username & password
// exports.updateUserDetails = async (req, res, next) => {
//   const userDetails = await UserDetails.findById({ _id: req.params.id });
//   const { username, userPassword } = req.body;

//   const password = encrypt(userPassword);
//   const decryptPassword = decrypt(password);

//   console.log(decryptPassword);

//   if (!userDetails) {
//     return res.status(404).json({
//       success: false,
//       message: "User Details Not Found",
//     });
//   }

//   const updateUserDetails = await UserDetails.findByIdAndUpdate(
//     req.params.id,
//     { username: username, userPassword: password, status: 1 },
//     {
//       new: true,
//       runValidators: true,
//       useFindAndModify: false,
//     }
//   );

//   console.log(updateUserDetails.email);

//   //create a node mailer...
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASS,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL,
//     to: updateUserDetails.email,
//     subject: `Welcome to ABC Company! ${updateUserDetails.email}`,
//     text: `Dear ${username},\nWe are excited to welcome you to ABC Company!
//       \nYou updated your password.
//       \nusername: ${username}
//       \nNew Password: ${decryptPassword} \n\n
//       To ensure ABC Company stays a safe and fun place to work we ask you to login using this username and password.\n
//       We will never spam your inbox.\n\n

//       You have agreed to the Terms of Service, the Privacy Policy, and the Conditions of the Icebreaker System.\n\n

//       Thanks,\n
//       ABC Company`,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log("Email sent: " + info.response);
//     }
//   });

//   if (!updateUserDetails) {
//     res.status(401).json({
//       success: false,
//       message: "User update was failed",
//     });
//   }

//   res.status(200).json({
//     success: true,
//     updateUserDetails,
//     message: "Update Successfull",
//   });
// };
