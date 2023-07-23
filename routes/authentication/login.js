const express = require('express');
const userSignupModel = require('../../all_schema/userSignup');
const bcrypt = require('bcrypt');
const login = async (req , res) => {
    let data = req.body
    const user = await userSignupModel.findOne({ email: data.email });

    if (user) {
        console.log(user);
        try {
            const match = bcrypt.compareSync(data.password, user.password);
            // Rest of the code here
          } catch (error) {
            console.error('Error comparing passwords:', error);
            // Handle the error or send an error response
          }
        if (match) {
            console.log( 'match hua');
            const token =  jwt.sign({
                email: user.email,
                full_name : `${user.first_name} ${user.last_name}`
            },'saylani',
            {expirsIn : '1h'})
            console.log(token , 'token');
            
        }else{
            console.log('token nahi mila');
        }

        return res.status(200).send({ status: 200, message: 'user login' , data: user });
    }else{
        return res.status(404).send({ status: 404, message: 'user not found' , data: user });
        
    }


} 
module.exports = login