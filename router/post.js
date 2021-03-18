const express = require('express')
const app = express();
const AdmincreateProduct = require('../Schema/AdmincreateProduct')
// const requireLogin = require('../middleWare/requireLogin')
const CheckoutData = require('../Schema/collectdatafromCheckout')
const AdminLogin = require('../Schema/adminSign')
const ProductCatogories = require('../Schema/ProductCatogories')
const nodemailer = require("nodemailer")











app.post("/SendEmailbyAdmin" ,(req, res) => {
    console.log(req.body);
    const { email , text , subject } = req.body;
    if( email , text , subject   ){
           console.log(email , text , subject  ); 
       



           let transporter = nodemailer.createTransport({
            service : "gmail" ,
            auth : {
                user : "projectpharma874@gmail.com" ,
                pass : "projectpharma12345"
            }
        })
        
        
        let mailOption = {
            from : "projectpharma874@gmail.com",
            to : email ,
            subject ,
            text 
        }
        
        transporter.sendMail(mailOption , function (err, data){
            if (err) console.log(err);
            else console.log("Suf");
        })
        




            }
    else res.json({ Error : "Field Are Required"})
})














app.post("/logIn" ,(req, res) => {
    // console.log(req.body);
    const { email , pass  } = req.body;
    if(email , pass ){
            
        AdminLogin.findOne({email,pass})
        .then((res2)=>{
            console.log(res2);
            // if (res2.email === email && res2.pass === pass)
            if (res2)
            res.send(res2)
            else
            res.send({ Error : "Password are Incorrect"})
        })
}
    else res.send({ Error : "Field Are Required"})
})


app.post("/logIn-send-code" ,(req, res) => {
    const Ma = Math.floor(Math.random()*2093980)
    console.log(Ma)

    // code = 


    let transporter = nodemailer.createTransport({
        service : "gmail" ,
        auth : {
            user : "projectpharma874@gmail.com" ,
            pass : "projectpharma12345"
        }
    })
    
    
    let mailOption = {
        from : "projectpharma874@gmail.com",
        to : "projectpharma874@gmail.com" ,
        subject : "COde" ,
        text : " "+Ma + " "
    }
    
    transporter.sendMail(mailOption , function (err, data){
        if (err) console.log(err);
        else res.send({Ma})
    })
    

})









app.post("/logIn-new-pass" ,(req, res) => {
    console.log(req.body);
    const {  pass } = req.body;
    AdminLogin.findOne({})
    .then((res2)=>{
        console.log(res2)
        var myquery = { pass: res2.pass };
        var newvalues = { $set: {pass} };
        AdminLogin.updateOne(myquery, newvalues, function(err, res1) {
            if (err)  res.json({message : " Error"});
            else res.json({message : " Successfully Save"})
        });
        });
    
    })

// })













app.post("/checkoutuserdataseen" ,(req, res) => {
    console.log(req.body);
    const {  id } = req.body;
    CheckoutData.findOne({_id : id})
    .then((res2)=>{
        console.log(res2)
        var myquery = { Seen:  res2.Seen };
        var newvalues = { $set:{Seen : true} };
        CheckoutData.updateOne(myquery, newvalues, function(err, res1) {
            if (err)  res.json({message : " Error"});
            else {
                CheckoutData.find({})
                .then((res3)=>{
                    res.send(res3)
                })
            }
        });
        });
    
    })

app.post("/checkoutuserdataunseen" ,(req, res) => {
    console.log(req.body);
    const {  id } = req.body;
    CheckoutData.findOne({_id : id})
    .then((res2)=>{
        console.log(res2)
        var myquery = { Seen: res2.Seen };
        var newvalues = { $set: {Seen : false} };
        CheckoutData.updateOne(myquery, newvalues, function(err, res1) {
            if (err)  res.json({message : " Error"});
            else {
                CheckoutData.find({})
                .then((res3)=>{
                    res.send(res3)
                })
            }        });
        });
    
    })



















app.post("/UsergetDatafromclient" ,(req, res) => {
    console.log(req.body);
    const { fname ,Lname,Order, Email,DoctorPrescipsion ,Address ,Address1 , Phone , ZipPostal   , StateCountry    ,Select_Country    ,Order_Notes  } = req.body;
    if( fname ,Lname,DoctorPrescipsion,Order, Email ,Address ,Address1 , Phone   , ZipPostal   , StateCountry    ,Select_Country    ,Order_Notes    ){
           console.log(fname ,Order,DoctorPrescipsion,Lname, Email ,Address ,Address1 , Phone  , StateCountry    ,Select_Country    ,Order_Notes  ); 
        const DataOfOrder = new CheckoutData({
                Email ,
                Address ,
                Address1 ,
                Phone  ,
                fullName   : fname + " "+ Lname ,
                ZipPostal ,
                // productName  : "bisprin"  , 
                // Pieces   : 1, 
                // productAmount  : 100 , 
                StateCountry    ,
                Select_Country    ,
                Order_Notes  ,
                Seen : false ,
                DoctorPrescipsion ,
                Order ,
                Date : new Date()
                })
                DataOfOrder.save().then((res2) =>{
                        res.send(res2)
                })
                .catch((err) =>{
                    res.json({Error : "There Is An Error"})
                })
            }
    else res.json({ Error : "Field Are Required"})
})






app.post("/AdminCreateProduct" ,(req, res) => {
    console.log(req.body);
                            const { Product_Name ,
                                    Product_Title ,
                                    Product_Price ,
                                    Product_Catagories ,
                                    Product_Image_Upload ,
                                    doctor_prescription ,
                                    Product_Short_Notes ,
                                    Product_Long_Notes ,
                                    Product_Popular ,
                                     } 
                                    = req.body;

    if( Product_Name ,Product_Title ,Product_Price ,Product_Popular,Product_Catagories ,Product_Image_Upload ,doctor_prescription ,Product_Short_Notes ,Product_Long_Notes   ){
           console.log(Product_Name ,Product_Title ,Product_Price,Product_Popular ,Product_Catagories ,Product_Image_Upload ,doctor_prescription ,Product_Short_Notes ,Product_Long_Notes ); 
        const CreateProduct = new AdmincreateProduct({
                                    Product_Name ,
                                    Product_Title ,
                                    Product_Price ,
                                    Product_Catagories ,
                                    Product_Image_Upload ,
                                    doctor_prescription ,
                                    Product_Short_Notes ,
                                    Product_Long_Notes ,
                                    Product_Popular ,
                                    Date : new Date()
                })
                CreateProduct.save()
                .then((res4)=>{
                  res.send(res4)
                    })
                    
                .catch((err) =>{
                    res.json({Error : "There Is An Error"})
                })


              
  
                
            }
    else res.json({ Error : "Field Are Required"})
})












// app.put("/AdminCreateProductCategories" ,(req, res) => {
//     console.log(req.body);
//                             const { Categories ,
//                                      } 
//                                     = req.body;

//     if( Categories  ){
//            console.log(Categories); 
        
//                     ProductCatogories.findOne({Categories :Product_Catagories })
//                     .then((res2)=>{
//                         console.log(res2);
//                     if (res2) {
//                         coun = res2.count
//                         ProductCatogories.findByIdAndUpdate(res2._id , {
//                                 $push : {count : coun + 1}
//                             },{
//                                 new : true
//                             },(err, user) => {
//                                 if(err){
//                                     return res.json({Error : "User Not Found"})
//                                 }
//                                 res.send(user)
                                
//                             })


                       
//                         }else{
                            
//  const CreateProductCatogories = new ProductCatogories({
//                             Categories  : Product_Catagories,
//                             count : 1
//                                 })
//                                 CreateProductCatogories.save()
//                                 .then((res3) =>{
//                                     res.send({res3,res4})
//                                 })
//                                 .catch((err) =>{
//                                     res.json({Error : "There Is An Error"})
//                                 })












//                         }
//                     })
                    
//                 .catch((err) =>{
//                     res.json({Error : "There Is An Error"})
//                 })


              
  
                
//             }
//     else res.json({ Error : "Field Are Required"})
// })










































app.post("/SearchProduct" ,(req, res) => {
            AdmincreateProduct.find({})
            .then((res1)=>{
                    res.send(res1)
                })    
                .catch((err) =>{
                    res.json({Error : "There Is An Error"})
                })
        
})































app.get("/CategoriesShop" ,(req, res) => {
    AdmincreateProduct.find({})
        .then((res2)=>{
            res.send(res2)
        })
        .catch((err)=>res.json({ Error : "Field Are Required"}))
})















app.get("/AllHomomethtic", (req, res)=>{
    AdmincreateProduct.find({Product_Catagories : "Homeopathic & Herbal"})
    .then((res2)=>{
        res.send(res2)
    })
})


app.get("/AllUserCheckoutData", (req, res)=>{
    CheckoutData.find({})
    .then((res2)=>{
        res.send(res2)
    })
})


app.get("/AllProduct", (req, res)=>{
    AdmincreateProduct.find({})
    .then((res2)=>{
        res.send(res2)
    })
})

app.get("/AllCategories", (req, res)=>{
    ProductCatogories.find({})
    .then((res2)=>{
        res.send(res2)
    })
})



app.delete("/deletePost/:post" ,(req,res)=>{
    AdmincreateProduct.findByIdAndDelete({_id:req.params.post})
    .then((post)=>{
         res.json(post)
    })
    
})


app.delete("/deleteCheckoutUser/:post" ,(req,res)=>{
    CheckoutData.findByIdAndDelete({_id:req.params.post})
    .then((post)=>{
         res.json(post)
    })
    
})





module.exports = app

