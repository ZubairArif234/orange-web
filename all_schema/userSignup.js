const mongoose = require('mongoose')
const schema =  mongoose.Schema
const useSignup = new schema({
    first_name :{
        type:String,
        require:true
    },
    last_name :{
        type:String,
        require:true
    },
    email :{
        type:String,
        require:true,
        unique:true
    },
    password :{
        type:String,
        require:true,
        minlength:8
        
    },
},{
    timestamps:true
})
const userSignupModel = mongoose.model('userSignup' , useSignup)
module.exports = userSignupModel