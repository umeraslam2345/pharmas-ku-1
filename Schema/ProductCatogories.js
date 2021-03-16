const mongoose = require('mongoose')
const ProductCatogories  = new mongoose.Schema({
    Categories : String,
    count : Number,


})
module.exports = mongoose.model("Product Categories" , ProductCatogories)

