const mongoose = require('mongoose')
const AdminSign  = new mongoose.Schema({
    Email : String,
    Password : String ,
    Phone : String,

})
module.exports = mongoose.model("Admin Sign" , AdminSign)

