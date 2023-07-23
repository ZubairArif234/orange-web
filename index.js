const express = require('express')
const authentication = require('./routes/authentication')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('')
.then(()=>console.log('connected'))
const app = express()
const port = process.env.port || 3001
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/authentication' , authentication)
app.listen(port , ()=>console.log('server is running'))
