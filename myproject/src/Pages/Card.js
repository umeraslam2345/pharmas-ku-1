import React, { useState , useEffect } from 'react';
import cloth_1 from '../assets/images/cloth_1.jpg';
import cloth_2 from '../assets/images/cloth_2.jpg';
import swal from 'sweetalert';

import { Link } from 'react-router-dom';

const Card = ()=> {
    const [Price , setPrice] = useState(1)
    const [cart , setCart] = useState([])
    const [total , settotal] = useState(0)
    const [total1 , settotal1] = useState(0)



    useEffect(() =>{
        setInterval(()=>{
           let data =  JSON.parse(localStorage.getItem("Cart")) 
           setCart(data)

           let data5 =  JSON.parse(localStorage.getItem("CartPrice")) 
           settotal1(data5)
          
        },3000)
        let data =  JSON.parse(localStorage.getItem("Cart")) 
        setCart(data)
 if (data) {
            var j = 0
            data.map((item,i)=>{
               j = item.Product_Price + j
            })
            settotal1(j)
            localStorage.setItem("CartPrice" ,JSON.stringify(j))
        }
        else{
            settotal1(0)

        }
        // console.log(total,cart,total1)
        // var t = document.getElementById("subtotal")
        // t.innerHTML = "Rs "+j
        // var f = document.getElementById("total")
        // f.innerHTML = "Rs " +j
      
  },[])
  

useEffect(() => {
  
    return () => {
        clearInterval()
    }
  }, [])

  const removeData = (id) =>{
    var data =  JSON.parse(localStorage.getItem("Cart")) 
     var j = 0
    data.map((res,i)=>{
        if (res._id === id)
         j += res.Product_Price 
    })
    var data1 = data.filter((res,i)=>{
        return res._id !== id
    })
    localStorage.setItem("Cart" ,JSON.stringify(data1))

   
    let data5 =  JSON.parse(localStorage.getItem("CartPrice"))     
    j =  data5 - j
    if ( j !== 0){
        localStorage.setItem("CartPrice",JSON.stringify( j))
    }
    else{
        localStorage.setItem("CartPrice",JSON.stringify( 0))
        settotal1(0)

    }
    
    
  }
   
        return (
            <div>
                <div className="bg-light py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-0"><Link to="/">Home</Link>  <span className="mx-2 mb-0">/</span> <strong className="text-black">Cart</strong></div>
                        </div>
                    </div>
                </div>

                <div className="site-section">
                    <div className="container">
                        <div className="row mb-5">
                            <form className="col-md-12" method="post">
                                <div className="site-blocks-table">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="product-thumbnail">Image</th>
                                                <th className="product-name">Product</th>
                                                <th className="product-price">Price</th>
                                                <th className="product-quantity">Quantity</th>
                                                <th className="product-total">Total</th>
                                                <th className="product-remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            cart.length >= 1 ? cart.map((item,i)=>{
                                                    return(
                                                        <tr key={i}>
                                                            <td className="product-thumbnail">
                                                                <img src={item.Product_Image_Upload} className="img-fluid" style={{height:"100px"}}  alt="Image"/>
                                                            </td>
                                                            <td className="product-name">
                                                                <h2 className="h5 text-black">{item.Product_Name}</h2>
                                                            </td>
                                                            <td>Rs {item.Product_Price / item.price}</td>
                                                            <td>
                                                                <div style={{maxWidth: "100px"}}>

                                                                    <center>
                                                                        <input type="text" className="form-control text-center"  value={item.price} onChange={(e)=>setPrice(e.target.value)}  min="1" max="100" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                                    </center>
     
                                                                </div>

                                                            </td>
                                                            <td>Rs {item.Product_Price}</td>
                                                            <td><Link onClick={()=>removeData(item._id)} className="btn btn-primary btn-sm">X</Link></td>
                                                        </tr>
                                                    )
                                            }) : <tr><td colSpan="6"><div className="col-sm-12 col-lg-12 mb-12"><center> <h3> No Product in Card</h3></center> </div></td></tr> 
                                       }
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="row mb-5">
                                    {/* <div className="col-md-6 mb-3 mb-md-0">
                                        <button className="btn btn-primary btn-sm btn-block">Update Cart</button>
                                    </div> */}
                                    <div className="col-md-6">
                                        <button className="btn btn-outline-primary btn-sm btn-block">Continue Shopping</button>
                                    </div>
                                </div>
                                {/* <div className="row">
                                    <div className="col-md-12">
                                        <label className="text-black h4" for="coupon">Doctor Prescipsion</label>
                                        <p>buy any Medicines Please upload the file !</p>
                                    </div>
                                    <div className="col-md-8 mb-3 mb-md-0">
                                    <form>
                                        <input type="file" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                                    </form>
                                    </div>
                                    <div className="col-md-4">
                                        <button className="btn btn-primary btn-sm">Submit</button>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-md-6 pl-5">
                                <div className="row justify-content-end">
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-md-12 text-right border-bottom mb-5">
                                                <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <span className="text-black">Subtotal</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black" id="subtotal">Rs : {total1}</strong>
                                            </div>
                                        </div>
                                        <div className="row mb-5">
                                            <div className="col-md-6">
                                                <span className="text-black">Total</span>
                                            </div>
                                            <div className="col-md-6 text-right">
                                                <strong className="text-black" id="total">Rs : {total1}</strong>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-12">
                                               <Link to="/checkout"> <button className="btn btn-primary btn-lg py-3 btn-block">Proceed To Checkout</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


export default Card;