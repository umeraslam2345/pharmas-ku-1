const express = require('express');
const app = express();
const Port = process.env.PORT || 3001  ;
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {Url} = require('./config/key')
const nodemailer = require("nodemailer")
















mongoose.connect("mongodb+srv://User:user12345@cluster0.3hib2.mongodb.net/Project0?retryWrites=true&w=majority",{
    useNewUrlParser: true,
    useUnifiedTopology: true ,
    useFindAndModify :  false ,
  })
app.use(express.json())

// app.use(require("./router/auth"))
app.use(require("./router/post"))
// app.use(require("./router/user"))






mongoose.connection.on('connected', ()=>{
    console.log("Mongoose Connection established")
})
mongoose.connection.on('error', (err)=>{
    console.log("Connection Error established" )
})


if(process.env.NODE_ENV === "production"){
    app.use(express.static('myproject/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'myproject','build','index.html'))
    })}

app.listen(Port, () => {
    console.log("Server is listening on port " +Port)
})