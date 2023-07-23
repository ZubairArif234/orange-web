const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');
const jwt = require('jsonwebtoken')
const userSignupModel = require('../../all_schema/userSignup');

const signup = async (req, res) => {
  let data = req.body;
  

const hash = bcrypt.hashSync(data.password, 10);
// console.log(hash);
  const schema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
  });

  try {
    await schema.validateAsync(data);
    const userAlreadyExist = await userSignupModel.findOne({ email: data.email });

    if (userAlreadyExist) {
      console.log(userAlreadyExist);
      return res.status(403).send({ status: 403, message: 'email already registered' });
      // res.status(500).send({ status: 500, message: "Email Already Registered" });
    }

    // console.log(data);
    const userSignup = new userSignupModel({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hash,
    });
    jwt.sign({userSignup}, privat_key,  function(err, token) {
      if (err){
          console.log(err);

      }else{

          console.log(token);
      }
    });

    await userSignup.save();
    res.status(200).send({ status: 200, message: 'User signup successfully' });
  } catch (error) {
    console.error(error);
    res.status(404).send({ status: 404, message: 'Not found' });
  }
};

module.exports = signup;
