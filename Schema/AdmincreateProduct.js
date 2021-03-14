const mongoose = require('mongoose')

const AdmincreateProduct =new mongoose.Schema({
    Product_Name   : String , 
    Product_Price   : Number , 
    Product_Title   : String , 
    Product_Catagories   : String , 
    Product_Image_Upload   : String , 
    doctor_prescription   : String , 
    Product_Short_Notes   : String ,
    Product_Long_Notes : String ,
    Product_Popular : String ,
    Date  : String ,

})
module.exports = mongoose.model("Product Upload" , AdmincreateProduct)