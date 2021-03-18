import React ,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'


const CheckoutUser = (props) => {
    const [checkout , setcheckout] = useState([])
    const [checkout1 , setcheckout1] = useState([])
    const [checkout2 , setcheckout2] = useState([])
    useEffect(() =>{
  
      if ( JSON.parse(localStorage.getItem("Admin")) ){
        fetch("/AllUserCheckoutData",{
            method: "GET",
             headers :  {
             "Content-Type" : "application/json" , 
         } ,
        })
        .then(res3=>res3.json())
        .then(res1=>{
          setcheckout(res1)
          const pro1 = []
          const pro2 = []
          res1.map((res,i)=>{
            if (res.Seen) pro1.push(res)
            else  pro2.push(res)
          })
          setcheckout1(pro1.reverse())
          setcheckout2(pro2.reverse())

        })
      }
      else{
        props.history.push("/login-admin")
      }
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

const clickbyseen = (data)=>{
        fetch("/checkoutuserdataseen",{
          method: "POST",
          headers :  {
              "Content-Type" : "application/json" , 
          } ,
          body : JSON.stringify({
  
              id : data._id
          })
      })
      .then(res=>res.json())
      .then((res2)=>{        
      if(res2){
        swal("Successfully Updated!");
        const pro1 = []
          const pro2 = []
          res2.map((res,i)=>{
            if (res.Seen) pro1.push(res)
            else  pro2.push(res)
          })
          setcheckout1(pro1.reverse())
          setcheckout2(pro2.reverse())
      }
      else{
        swal(res2.Error);
      }
      })

}

const clickbyunseen = (data)=>{
        fetch("/checkoutuserdataunseen",{
          method: "POST",
          headers :  {
              "Content-Type" : "application/json" , 
          } ,
          body : JSON.stringify({
  
              id : data._id
          })
      })
      .then(res=>res.json())
      .then((res2)=>{        
      if(res2){
        swal("Successfully Updated!");
        const pro1 = []
          const pro2 = []
          res2.map((res,i)=>{
            if (res.Seen) pro1.push(res)
            else  pro2.push(res)
          })
          setcheckout1(pro1.reverse())
          setcheckout2(pro2.reverse())
      }
      else{
        swal(res2.Error);
      }
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
                          <th scope="col">Seen</th>
                          <th scope="col">View Order</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        checkout2.map((res,i)=>{
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
                                        <td><button onClick={()=>clickbyseen(res)} className="btn btn-sm btn-primary">Seen</button></td>
                                        <td><Link to={"/allcheckoutuser/"+res._id}><button className="btn btn-sm btn-primary">View Order</button></Link></td>
                                        <td><button className="btn btn-sm btn-primary" onClick={()=>deleteProduct(res._id)}>Delete</button></td>
                                    </tr>
                              
                          })
                      }

                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                      {
                        checkout1.map((res,i)=>{
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
                                        <td><button onClick={()=>clickbyunseen(res)} className="btn btn-sm btn-primary">UnSeen</button></td>
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