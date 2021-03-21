import React, {useState , useEffect} from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

const Checkout = (props) => {
    const [fname , setfName ] = useState("")
    const [Lname , setLName ] = useState("")
    const [CName , setCName ] = useState("")
    const [Address , setAddress ] = useState("")
    const [Address1 , setAddress1 ] = useState("")
    const [StateCountry , setStateCountry ] = useState("")
    const [ZipPostal , setZipPostal ] = useState("")
    const [Email , setEmail ] = useState("")
    const [Phone , setPhone ] = useState("")
    const [Order_Notes , setOrder_Notes ] = useState("")
    const [Select_Country , setSelect_Country ] = useState("")
    const [cart , setCart] = useState([])
    const [total , settotal] = useState(0)
    const [doctor , setdoctor] = useState(false)
    const [Product_Image_Upload , setProduct_Image_Upload] = useState("")




    useEffect(() =>{
        
        var data =  JSON.parse(localStorage.getItem("Cart")) 
        if (data) {
            setCart(data)
            var j = 0
            data.map((item,i)=>{
               j = item.Product_Price + j
               if (item.doctor_prescription){
                localStorage.setItem("doctor",JSON.stringify(true))
               }
            })
            var doc =  JSON.parse(localStorage.getItem("doctor")) 
            setdoctor(doc)
            var t = document.getElementById("subtotal")
            t.innerHTML = "Rs "+j
            var f = document.getElementById("total")
            f.innerHTML = "Rs " +j
        }
        // console.log(total,cart,j)
   else{
            var t = document.getElementById("subtotal")
            t.innerHTML = "Rs "+0
            var f = document.getElementById("total")
            f.innerHTML = "Rs " +0
   }
  },[])
  

//   useEffect(() => {
  
//     return () => {
//         localStorage.removeItem("doctor")
//     }
//   }, [])


    const SubmitDataMessage = (e) =>{
        e.preventDefault()
        console.log(cart)
        if ( JSON.parse(localStorage.getItem("User"))  ){
            if (cart.length  >= 1 ){
        console.log("wddde");
        const data = new FormData()
            data.append("file", Product_Image_Upload)
            data.append("upload_preset", "product")
            data.append("cloud_name", "freedeveloper")
            fetch("https://api.cloudinary.com/v1_1/freedeveloper/image/upload",{ 
                method : "POST",
                body : data , 
            })
            .then(res3=>res3.json())
            .then((res1)=>{
                fetch("/UsergetDatafromclient",{
                        method: "POST",
                        headers :  {
                            "Content-Type" : "application/json" , 
                        } ,
                        body : JSON.stringify({
                            fname,
                            Lname ,
                            CName, 
                            Address ,
                            Address1 ,
                            StateCountry  ,
                            ZipPostal ,
                            Email ,
                            Phone ,
                            Order_Notes,
                            Select_Country,
                            DoctorPrescipsion : res1.url ,
                            Order : cart
                        }),
                    })
                    .then(res=>res.json())
                    .then((res2)=>{        
                    if(res2.Error){
                        swal(res2.Error);
                     }
                     else{
                        swal("Successfully Submit your Order!");
                        fetch("/user-cart-order",{
                            method: "POST",
                            headers :  {
                                "Content-Type" : "application/json" , 
                            } ,
                            body : JSON.stringify({
                                Order : cart ,
                                user : JSON.parse(localStorage.getItem("User")) 
                            })
                        })
                        .then(res=>res.json())
                        .then((res1)=>{ 
                            console.log(res1);
                        })
                        fetch("/user-cart-detail",{
                            method: "POST",
                            headers :  {
                                "Content-Type" : "application/json" , 
                            } ,
                            body : JSON.stringify({
                                Details : {
                                    fname,
                                    Lname ,
                                    CName, 
                                    Address ,
                                    Address1 ,
                                    StateCountry  ,
                                    ZipPostal ,
                                    Email ,
                                    Phone ,
                                    Order_Notes,
                                    Select_Country,
                                    DoctorPrescipsion : res1.url ,
                                },
                                user : JSON.parse(localStorage.getItem("User")) 
                            })
                        })
                        .then(res6=>res6.json())
                        .then((res7)=>{ 
                            console.log(res7);
                        })

                            setfName ("")
                            setLName ("" )
                            setCName ("")
                            setAddress  ("")
                            setAddress1 ("" )
                            setStateCountry  ("" )
                            setZipPostal ("" )
                            setEmail ("" )
                            setPhone ("" )
                            setOrder_Notes ("")
                            setSelect_Country ("")
                        localStorage.removeItem("Cart")
                        localStorage.removeItem("doctor")
                        localStorage.removeItem("SearchData")
                        localStorage.removeItem("Data")
                        localStorage.removeItem("CartPrice")
                        props.history.push(`/thankyou`)

                     }
                  })
                  .catch(err=>{
                    swal("There is an Error");
                })


            })
            .catch(err=>{
                    swal("There is an Error Try Again !");
                    })   
}
else{
    swal("No Product In Cart !");
}
        }
else{
    swal("Plz SignIn First !");
    props.history.push(`/login`)
}
       
    }
        return (
            <div>
                <div className="bg-light py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <Link to="/cart">Cart</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Checkout</strong></div>
                        </div>
                    </div>
                </div>
            <form onSubmit={(e)=>SubmitDataMessage(e)}>
                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <div className="col-md-12">
                                <div className="border p-4 rounded" role="alert">
                                    Returning customer? <Link to="/login">Click here</Link> to login
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 mb-5 mb-md-0">
                                <h2 className="h3 mb-3 text-black">Billing Details</h2>
                                <div className="p-3 p-lg-5 border">
                                    <div className="form-group">
                                        <label htmlFor="c_country" className="text-black">Country <span className="text-danger">*</span></label>
                                        <input type="text"  required value={Select_Country} onChange={(e)=>setSelect_Country(e.target.value)}  className="form-control" />
                                        {/* <select id="c_country" className="form-control">
                                            <option value="1">Select a country</option>
                                            <option value="2">bangladesh</option>
                                            <option value="3">Algeria</option>
                                            <option value="4">Afghanistan</option>
                                            <option value="5">Ghana</option>
                                            <option value="6">Albania</option>
                                            <option value="7">Bahrain</option>
                                            <option value="8">Colombia</option>
                                            <option value="9">Dominican Republic</option>
                                        </select> */}
                                    </div>
                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                                            <input type="text" required value={fname} onChange={(e)=>setfName(e.target.value)}  className="form-control" id="c_fname" name="c_fname" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                                            <input type="text" required value={Lname} onChange={(e)=>setLName(e.target.value)}  className="form-control" id="c_lname" name="c_lname" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_companyname" className="text-black">Company Name </label>
                                            <input type="text"required value={CName} onChange={(e)=>setCName(e.target.value)} className="form-control" id="c_companyname" name="c_companyname" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-12">
                                            <label htmlFor="c_address" className="text-black">Address <span className="text-danger">*</span></label>
                                            <input type="text" required value={Address} onChange={(e)=>setAddress(e.target.value)}   className="form-control" id="c_address" name="c_address" placeholder="Street address" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <input type="text" required value={Address1} onChange={(e)=>setAddress1(e.target.value)}  className="form-control" placeholder="Apartment, suite, unit etc. (optional)" />
                                    </div>

                                    <div className="form-group row">
                                        <div className="col-md-6">
                                            <label htmlFor="c_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                                            <input type="text" required value={StateCountry} onChange={(e)=>setStateCountry(e.target.value)} className="form-control" id="c_state_country" name="c_state_country" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="c_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                                            <input type="text" required value={ZipPostal} onChange={(e)=>setZipPostal(e.target.value)}  className="form-control" id="c_postal_zip" name="c_postal_zip" />
                                        </div>
                                    </div>

                                    <div className="form-group row mb-5">
                                        <div className="col-md-6">
                                            <label htmlFor="c_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                                            <input type="text" required value={Email} onChange={(e)=>setEmail(e.target.value)} className="form-control" id="c_email_address" name="c_email_address" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="c_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                                            <input type="tel" required value={Phone} onChange={(e)=>setPhone(e.target.value)}   className="form-control" id="c_phone" name="c_phone" placeholder="Phone Number" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="c_order_notes" className="text-black">Order Notes</label>
                                        <textarea name="c_order_notes" required value={Order_Notes} onChange={(e)=>setOrder_Notes(e.target.value)} id="c_order_notes" cols="30" rows="5" className="form-control" placeholder="Write your notes here..."></textarea>
                                    </div>

                                    {
                                        doctor ? <div className="row">
                                        <div className="col-md-12">
                                            <label className="text-black h4" for="coupon">Doctor Prescipsion</label>
                                            <p>buy those Medicines which have require to upload the file !</p>
                                        </div>
                                        <div className="col-md-8 mb-3 mb-md-0">
                                            <input type="file" required onChange={(e)=>setProduct_Image_Upload(e.target.files[0])} className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                                        </div>
                                    </div> : ""
                                    }
                                    
                                </div>
                                
                            </div>
                            <div className="col-md-6">

                                

                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <h2 className="h3 mb-3 text-black">Your Order</h2>
                                        <div className="p-3 p-lg-5 border">
                                            <table className="table site-block-order-table mb-5">
                                                <thead>
                                                    <th>Product</th>
                                                    <th>Qty</th>
                                                    <th>Total</th>
                                                </thead>
                                                <tbody>
                                                {
                                                    cart && cart.map((item,i)=>{
                                                        return(<tr>
                                                        <td>{item.Product_Name}</td>
                                                        <td>x {item.price}</td>
                                                        <td>Rs {item.Product_Price}</td>
                                                    </tr>)
                                                    })
                                                }
  
                                                    <tr>
                                                        <td className="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                                                        <td className="text-black font-weight-bold"></td>
                                                        <td className="text-black" id="subtotal">$350.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                                                        <td className="text-black font-weight-bold"></td>
                                                        <td className="text-black font-weight-bold" id="total"><strong>$350.00</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                            <div className="border p-3 mb-3">
                                                <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsebank" role="button" aria-expanded="false" aria-controls="collapsebank">Order on Delivery</a></h3>

                                                <div className="collapse" id="collapsebank">
                                                    <div className="py-2">
                                                        <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* <div className="border p-3 mb-3">
                                                <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsecheque" role="button" aria-expanded="false" aria-controls="collapsecheque">Cheque Payment</a></h3>

                                                <div className="collapse" id="collapsecheque">
                                                    <div className="py-2">
                                                        <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border p-3 mb-5">
                                                <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsepaypal" role="button" aria-expanded="false" aria-controls="collapsepaypal">Paypal</a></h3>

                                                <div className="collapse" id="collapsepaypal">
                                                    <div className="py-2">
                                                        <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                                                    </div>
                                                </div>
                                            </div> */}

                                            <div className="form-group">
                                               {/* <Link to='thankyou'> */}
                                                <button type="submit" className="btn btn-primary btn-lg py-3 btn-block">Place Order</button>
                                                {/* </Link> */}
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </form>

            </div>
        )
    
}

export default Checkout;