const Users = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {commonMessage,commonResults} = require('../Common/common');
const { db } = require("../Models/UserModel");


exports.signUp = async (req, res) => {
  const { userName, passWord } = req.body;

  if (!userName || !passWord)
    return res
      .status(400)
      .json({ success: commonResults.fail, message: commonMessage.wrongPassOrUserName });
  try {
    // check for existing userName
    const user = await Users.findOne({ userName });
    if (user) {
      return res
        .status(400)
        .json({ success: commonResults.fail, message: commonMessage.haveUserName });
    }

    // ALL Good
    const encryptPassword = await bcrypt.hash(passWord, 12);
    const newUser = await Users.create({ userName : userName, passWord: encryptPassword });
  userName

    // return token
    const accessToken = jwt.sign(
      { userID: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res
      .status(201)
      .json({ success:commonResults.success, accessToken });
  } catch (error) {
    console.log(error);
   
    return res
      .status(500)
      .json({ success: commonResults.fail, message: commonMessage.serverBroken });
  }
};

exports.login = async (req, res) => {
  const { userName, passWord } = req.body;
  if (!userName || !passWord)
    return res
      .status(400)
      .json({ success: commonResults.fail, message: commonMessage.missingPassOrUser });

  try {
    // check for exiting user
    const user = await Users.findOne({ userName });
    
    if (!user) {
      return res
        .status(400)
        .json({ success: commonResults.fail, message: commonMessage.wrongPassOrUserName });
    }

    // user name found
    // check passWord corect

    const passWordValid = await bcrypt.compare(passWord, user.passWord);
    if (!passWordValid)
      return res
        .status(400)
        .json({ success: commonResults.fail, message: commonMessage.wrongPassOrUserName });

    // ALL Good
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res
      .status(201)
      .json({ success:commonResults.success, accessToken });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: commonResults.fail, message: commonMessage.serverBroken });
  }
};


exports.checkUserLogin = async(req,res)=>{
 try {
 
   const user = await Users.findById(req.userID).select('-passWord');
   if(!user) return res.status(400).json({succces :commonResults.fail, message : 'user not found'});
  return res.json({succces : commonResults.success,user})

 } catch (error) {
  return res
  .status(500)
  .json({ success: commonResults.fail, message: commonMessage.serverBroken });
 } 

}