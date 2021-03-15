import React ,{useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';


const CheckoutUserOrderData = (props) => {


    const [checkout , setcheckout] = useState([])
    const [product1 , setproduct1] = useState([])
    const [email , setemail] = useState("")
    const [text , settext] = useState("")
    const [subject , setsubject] = useState("")
    useEffect(() =>{
  
     const lasturl = props.match.url.split("/")[2]
     console.log(lasturl)
        fetch("/AllUserCheckoutData",{
            method: "GET",
             headers :  {
             "Content-Type" : "application/json" , 
         } ,
        })
        .then(res3=>res3.json())
        .then(res1=>{
            const res12 = res1.filter((res,i)=>{
                return res._id === lasturl
            })
          setcheckout(res12)
          setproduct1(res12[0].Order)
          setemail(res12[0].Email)
          console.log(res12[0].Order)
        })
     },[])






     const deleteProduct = (id) =>{
        fetch("/deleteCheckoutUser/"+id ,{
          method: "DELETE" , 
          headers: {
            "Content-Type" : "application/json" ,
          }
        })
        .then(res=>res.json())
        .then(res2=>{
          const newData = checkout.filter(data=> data._id !== res2._id)
          setcheckout(newData)
        })
      }






      const SendProduct =(e) =>{
        e.preventDefault()
        console.log(email , text , subject )
        fetch("/SendEmailbyAdmin",{
                        method: "POST",
                        headers :  {
                            "Content-Type" : "application/json" , 
                        } ,
                        body : JSON.stringify({
                            email,
                            text ,
                            subject,                             
                        }),
                    })
                    .then(res=>res.json())
                    .then((res2)=>{        
                    if(res2.Error){
                        swal(res2.Error);
                     }
                     else{
                        swal("Successfully Submit your Order!");

                     }
                  })
                  .catch(err=>{
                      console.log("There is An Error")                  
                    })
            
      }







    return (
        <div className="container">
            <div className="row mb-5">
                            <form className="col-md-12" onSubmit={(e)=>SendProduct(e)}>
                                <div className="site-blocks-table">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">fullName</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone</th>
                                            {/* <th scope="col">DoctorPrescipsion</th> */}
                                            <th scope="col">Date</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Address1</th>
                                            <th scope="col">StateCountry</th>
                                            <th scope="col">Select_Country</th>
                                            <th scope="col">ZipPostal</th>
                                            <th scope="col">Order_Notes</th>
                                            <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            checkout.map((res,i)=>{
                                                return (<>
                                                            <tr key={i}>
                                                                <td>{i+1}</td>
                                                                <td>{res.fullName}</td>
                                                                <td>{res.Email}</td>
                                                                <td>{res.Phone}</td>
                                                                <td>{res.Date}</td>
                                                                <td>{res.Address}</td>
                                                                <td>{res.Address1}</td>
                                                                <td>{res.StateCountry}</td>
                                                                <td>{res.Select_Country}</td>
                                                                <td>{res.ZipPostal}</td>
                                                                <td>{res.Order_Notes}</td>
                                                                <td><button className="btn btn-sm btn-primary" onClick={()=>deleteProduct(res._id)}>Delete</button></td>
                                                            </tr>
                                                            
                                                            <tr>
                                                                <th className="color-th">Order</th>
                                                                <th className="color-th">Product Name</th>
                                                                <th className="color-th">Product Title</th>
                                                                <th className="color-th">Product Catagories</th>
                                                                <th className="color-th">Product Image </th>
                                                                <th className="color-th">Price</th>
                                                                <th className="color-th">Pieces</th>
                                                                <th className="color-th">Total Price</th>
                                                                <th className="color-th">Product Doctor Prescipsion</th>
                                                                <th className="color-th">Date</th>
                                                                
                                                            </tr>
                                                        
                                                            
                                                            {
                                            product1.map((res,i)=>{
                                                return (
                                                    <>
                                                    <tr key={i}>
                                                        <td>{i+1}</td>
                                                        <td>{res.Product_Name}</td>
                                                        <td>{res.Product_Title}</td>
                                                        <td>{res.Product_Catagories}</td>
                                                        <td><img src={res.Product_Image_Upload}  style={{width : "100px",height : "100px"}} alt=""/>  </td>
                                                        <td>{res.Product_Price / res.price}</td>
                                                        <td>{res.price}</td>                                                        
                                                        <td>{res.Product_Price }</td>
                                                        <td>{res.doctor_prescription}</td>                                                        
                                                        <td>{res.Date}</td>
                                                    </tr>
                                                    </>
                                                )

                                            }) 
                                        }   
                                                            <tr>
                                                                <td>
                                                                <b> Doctor Prescipsion</b>
                                                                </td>
                                                                <td  colSpan="6">
                                                                    <img src={res.DoctorPrescipsion} style={{ height : "400px"}} id="myImg" alt="Image"/>  
                                                                </td>
                                                            </tr>
                                                        </>
                                                        )
                                            })
                                        }
                                                                <tr>
                                                                <td>
                                                                <b> Send Email bu User</b>
                                                                </td>
                                                                <td>
                                                                    to :
                                                                </td>
                                                                <td>
                                                                    <input type="text" value={email}/>
                                                                </td>
                                                                <td>
                                                                    <b>
                                                                        Subject :
                                                                    </b>
                                                                </td>
                                                                <td>
                                                                <textarea name="" id="" cols="35" rows="4"  value={subject} onChange={(e)=>setsubject(e.target.value)} ></textarea>
                                                                </td>
                                                                <td>
                                                                    <b>
                                                                        text :
                                                                    </b>
                                                                </td>
                                                                <td >
                                                                
                                                                <textarea name="" id="" cols="35" rows="4"  value={text} onChange={(e)=>settext(e.target.value)} ></textarea>
                                                                </td>
                                                                <td><button className="btn btn-sm btn-primary" type="submit">Send</button></td>

                                                            </tr>
                                                            
                        
                         
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
        </div>
    )
}

export default CheckoutUserOrderData
