// const JWT = require("jsonwebtoken")
// const {JWT_SECRET} = require("../config/key")
// const SignIn = require("../Schema/userSign") 
// module.exports = (req,res,next)=>{
//     const {authorization} = req.headers;
//     if(!authorization){
//         res.json({error :  "Please Must Be Signed In"})
//     }
//     else{
//         const token = authorization.replace("Bearer " , "")
//         JWT.verify(token , JWT_SECRET , (err,payload) => {
            
//             if(!err) {
//                 const {_id} = payload
//                 SignIn.findById(_id).then((user)=>{
//                     req.user = user
//                     next()
//                 })
//             }
//             else
//             res.json({error :"There is an error" })
//         })  
//     }
// }