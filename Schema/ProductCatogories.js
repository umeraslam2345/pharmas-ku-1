const mongoose = require('mongoose')
const ProductCatogories  = new mongoose.Schema({
    Categories : String,


})
module.exports = mongoose.model("Product Categories" , ProductCatogories)

