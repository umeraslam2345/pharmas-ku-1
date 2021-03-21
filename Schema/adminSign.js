const mongoose = require('mongoose')
const AdminLogin  = new mongoose.Schema({
    email : String,
    pass : String ,
    user : String , 
    cart :  [{type:Object}] ,
    Order  : [{type:Object}],
    Detail  : [{type:Object}]
})
module.exports = mongoose.model("Admin Sign" , AdminLogin)

