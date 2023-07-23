// const express = require('express');
// const userSignupModel = require('../../all_schema/userSignup');
// const bcrypt = require('bcrypt');

// let token = {}
// const verifyEmail = async(req , res , next) =>{
// let data = req.body
// const user = await userSignupModel.findOne({ email: data.email });
// if(user){
//     // Math.floor(10 + Math.random() * 28)
//     let restToken = Math.ceil(1000 + Math.random() * 98) 
//     token.resetToken = restToken*189
//     // console.log(restToken * 189);
//     res.status(200).send({status: '200' , verify_token : restToken*189 , user: user})
// }else{
//     res.status(404).send({status:'404' , message:'user not found'})
// }

// }
 

// const changePassword = (req , res , next) => {
//     // console.log(data);
//     let data = req.body
//     if(token.resetToken == data.resetToken){

//         const hash = bcrypt.hashSync(data.password, 10);
//         userSignupModel.updateOne({_id : data._id },{password : hash} , (err) => {
    //             if(err){
        //                 res.status(403).send({status: '403' , message : 'password donot updated'})
//             }else{
//                 res.status(200).send({status: '200' , message : 'password updated'})
                
//             }
//         })
//     }else{
//         res.status(403).send({status: '403' , message : 'token is invalid'})

//     }
// }



const express = require('express');
const userSignupModel = require('../../all_schema/userSignup');
const bcrypt = require('bcrypt');

const verifyEmail = async (req, res, next) => {
  let data = req.body;
  const user = await userSignupModel.findOne({ email: data.email });
  if (user) {
      let restToken = Math.ceil(1000 + Math.random() * 98);
      // Store the reset token in the user's document
      user.resetToken = restToken * 189;
             await userSignupModel.updateOne({email: data.email },{restToken : user.resetToken})
    //   await user.save();
      
      res.status(200).send({ status: '200', verify_token: user.resetToken, user: user });
  } else {
    res.status(404).send({ status: '404', message: 'user not found' });
  }
};

const changePassword = async (req, res, next) => {
  let data = req.body;
  try {
    const user = await userSignupModel.findOne({ _id: data._id, resetToken: data.resetToken });
    if (!user) {
      return res.status(403).send({ status: '403', message: 'Token is invalid or user not found' });
    }

    const hash = bcrypt.hashSync(data.password, 10);
    user.password = hash;
    user.resetToken = undefined; // Clear the resetToken after password change
    await user.save(); 

    res.status(200).send({ status: '200', message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).send({ status: '500', message: 'Internal server error' });
  }
};

module.exports = { verifyEmail, changePassword };


// module.exports = { verifyEmail, changePassword };
