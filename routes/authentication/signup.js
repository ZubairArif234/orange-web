const express = require('express')
const mongoose = require('mongoose')
const userSignupModel = require('../../all_schema/userSignup')
const signup = (req , res)=>{
    let data = req.body
    const userSignup = new userSignupModel({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
    })
console.log(data);
userSignup.save().
then(()=>console.log('data saved'))
if(data){
    res.status(200).send({ status: 200, message: "user signup successfully" });

}else{
    res.status(404).send({ status: 404, message: "not found" });

}
}
module.exports = signup