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


app.post("/logIn-user" ,(req, res) => {
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

app.post("/signup-user-1" ,(req, res) => {
    // console.log(req.body);
    const { email , pass , user } = req.body;
    if(email , pass , user ){
        AdminLogin.findOne({email})
        .then((res3)=>{
            console.log(res3);
            if(res3 != null){
                res.send({Error : "Email Already Exists"})
            }
            else{ 
                 const AdminLogin1 = new AdminLogin({
            email , 
            pass , 
            user 
            })
            AdminLogin1.save().then((res2) =>{
                    res.send(res2)
            })
            }
        })

}
    else res.send({ Error : "Field Are Required"})
})






app.get("/userall" ,(req, res) => {
        AdminLogin.find({})
         .then((res2) =>{
                    res.send(res2)
            })
})



















app.post("/logIn-send-code" ,(req, res) => {



    if (req.body.email === "projectpharma874@gmail.com"){

    
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
    
    }
else{
    AdminLogin.findOne({email :  req.body.email})
    .then((res2)=>{
        console.log(res2,"res2" ,req.body);
        if (res2){

            const Ma = Math.floor(Math.random()*2093980)
            
            let transporter = nodemailer.createTransport({
                service : "gmail" ,
                auth : {
                    user : "projectpharma874@gmail.com" ,
                    pass : "projectpharma12345"
                }
            })
            let mailOption = {
                from : "projectpharma874@gmail.com",
                to : res2.email ,
                subject : "COde" ,
                text : " "+Ma + " "
            }
            transporter.sendMail(mailOption , function (err, data){
                if (err) console.log(err);
                else res.send({Ma})
            })
        }
        else
        res.send({ Error : "Email are Incorrect"})
    })
}
})













app.post("/touchIn" ,(req, res) => {


    const {name  ,lname  ,email  ,subject  ,Message  } = req.body


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
        subject : name + " "+lname + " " + email,
        text : Message
    }
    
    transporter.sendMail(mailOption , function (err, data){
        if (err) console.log(err);
        else res.send({Ma})
    })
    
    

})



















app.post("/logIn-new-pass" ,(req, res) => {
    console.log(req.body);
    const { email} = req.body;
    AdminLogin.findOne({email})
    .then((res2)=>{
        console.log(res2,"res2")
        var myquery = { pass: res2.pass };
        var newvalues = { $set: {pass : req.body.pass} };
        AdminLogin.updateOne(myquery, newvalues, function(err, res1) {
            console.log(res1);
            if (err)  res.json({message : " Error"});
            else res.json({message : " Successfully Save"})
        });
        });
    
    })



app.post("/user-cart-add" ,(req, res) => {
    console.log(req.body);
    const {  cart , user} = req.body;
    AdminLogin.findOne({_id : user._id})
    .then((res2)=>{
        console.log(res2)
        var myquery = { cart: res2.cart };
        var newvalues = { $set: {cart} };
        AdminLogin.updateOne(myquery, newvalues, function(err, res1) {
            console.log(res1);
            if (err)  res.json({message : " Error"});
            else res.json({message : " Successfully Save"})
        });
        });
    
    })


app.post("/user-cart-order" ,(req, res) => {
    // console.log(req.body);
    const {  Order , user} = req.body;
    AdminLogin.findOne({_id : user._id})
    .then((res2)=>{
        console.log(res2)
        var myquery = { Order: res2.Order };
        var newvalues = { $set: {Order} };
        AdminLogin.updateOne(myquery, newvalues, function(err, res1) {
            // console.log(res1);
            if (err)  res.json({message : " Error"});
            else res.json({message : " Successfully Save"})
        });
        });
    
    })

app.post("/user-cart-detail" ,(req, res) => {
    console.log(req.body.Details);
    const {  Details , user} = req.body;
    AdminLogin.findOne({_id : user._id})
    .then((res2)=>{
        console.log(res2)
        var myquery = { Details: res2.Details };
        var newvalues = { $set: {Details} };
        AdminLogin.updateOne(myquery, newvalues, function(err, res1) {
            // console.log(res1);
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


app.post("/createCate", (req, res)=>{
    const {Cate} = req.body

    ProductCatogories1 =new ProductCatogories({
        Categories : Cate
    })
    .save()
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

app.delete("/deleteUser/:post" ,(req,res)=>{
    AdminLogin.findByIdAndDelete({_id:req.params.post})
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

