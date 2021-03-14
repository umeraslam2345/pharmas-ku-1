const express = require('express')
const app = express();
// const Post = require('../Schema/postSchema')
// const requireLogin = require('../middleWare/requireLogin')
const User = require('../Schema/collectdatafromCheckout')
const bcryptjs = require('bcryptjs')



// app.put("/changePassword",requireLogin , (req,res)=>{
//     bcryptjs.compare(req.body.oldPassword ,req.user.Password )
//     .then(doMatch=>{
//         if(doMatch) {
//             console.log(doMatch)
//             bcryptjs.hash(req.body.newPassword,17)
//             .then((hashPassword)=>{
//                 console.log(hashPassword)
//                 User.findByIdAndUpdate(req.user._id , {
//                         $pull : {Password :hashPassword}
//                     },{
//                         new : true
//                     },(err, user) => {
//                         console.log(user)
//                         if(user){
//                             res.json(user)
//                         }
//                         else{
//                             return res.json({Error : "Password Not Change Try Again"})
//                         }
//                     })
//                 })
//                 .catch(err =>{
//                     res.json({Error : "Password Not Save"})
//                 })
                   
//         }
//         else{
//             res.json({Error  : "Plz Enter a Correct Old Password"})
//              }
//     })
        
// })

module.exports = app;