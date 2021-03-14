import React ,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'



const CheckoutUser = () => {
    const [checkout , setcheckout] = useState([])
    useEffect(() =>{
  
     
        fetch("http://localhost:3000/AllUserCheckoutData",{
            method: "GET",
             headers :  {
             "Content-Type" : "application/json" , 
         } ,
        })
        .then(res3=>res3.json())
        .then(res1=>{
          setcheckout(res1)
        })
     },[])





     const deleteProduct = (id) =>{
        fetch("http://localhost:3000/deleteCheckoutUser/"+id ,{
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









    return (
        <div>
            <div className="container">
                <br/>
                <br/>
                <br/>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          {/* <th scope="col">Upload</th> */}
                          {/* <th scope="col">Product Name</th> */}
                          {/* <th scope="col">Product Price</th> */}
                           {/* <th scope="col">Pieces</th>  */}
                          <th scope="col">#</th>
                          <th scope="col">fullName</th>
                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Date</th>
                          <th scope="col">Address</th>
                          <th scope="col">Address1</th>
                          <th scope="col">StateCountry</th>
                          <th scope="col">Select_Country</th>
                          <th scope="col">Order_Notes</th>
                          <th scope="col">View Order</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        checkout.map((res,i)=>{
                              return <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        {/* <td><img src={res.fullName} alt="Upload" style={{width : "200px" , height : "150px"}}/></td> */}
                                        <td>{res.fullName}</td>
                                        <td>{res.Email}</td>
                                        {/* <td>{res.productName}</td> */}
                                        {/* <td>{res.productAmount}</td> */}
                                        <td>{res.Phone}</td>
                                        {/* <td>{res.Pieces}</td> */}
                                        <td>{res.Date}</td>
                                        <td>{res.Address}</td>
                                        <td>{res.Address1}</td>
                                        <td>{res.StateCountry}</td>
                                        <td>{res.Select_Country}</td>
                                        <td>{res.Order_Notes}</td>
                                        <td><Link to={"/allcheckoutuser/"+res._id}><button className="btn btn-sm btn-primary">View Order</button></Link></td>
                                        <td><button className="btn btn-sm btn-primary" onClick={()=>deleteProduct(res._id)}>Delete</button></td>
                                    </tr>
                          })
                      }

                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default CheckoutUser