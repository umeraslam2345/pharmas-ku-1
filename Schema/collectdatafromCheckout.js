const mongoose = require('mongoose')
// const {ObjectId} = mongoose.SchemaTypes

const CheckoutData  = new mongoose.Schema({
    Email : String,
    Address :  String,
    Address1 :  String,
    Phone : String ,
    fullName   : String , 
    // productName   : String , 
    // Pieces   : Number , 
    ZipPostal : Number ,
    // productAmount   : Number  , 
    StateCountry   : String ,
    Select_Country   : String ,
    Order_Notes : String ,
    Date  : String ,
    DoctorPrescipsion : String ,
    Order  : [{type:Object}]
})
module.exports = mongoose.model("Checkout Data from User" , CheckoutData)


