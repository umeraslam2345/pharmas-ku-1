const mongoose = require('mongoose')
const AdminLogin  = new mongoose.Schema({
    email : String,
    pass : String ,
})
module.exports = mongoose.model("Admin Sign" , AdminLogin)

