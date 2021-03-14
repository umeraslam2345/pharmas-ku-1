import React ,{useEffect , useState} from 'react'
import {Link} from "react-router-dom"
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import Fab from '@material-ui/core/Fab';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';


export default function Admin() {
  const [product , setproduct] = useState([])
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




    fetch("http://localhost:3000/AllProduct",{
       method: "GET",
        headers :  {
        "Content-Type" : "application/json" , 
    } ,
   })
   .then(res=>res.json())
   .then(res2=>{
    setproduct(res2)
   })
 },[])


    return (

            <div>
            <br/>
            <br/>
            <br/>
    
               <div className="container" style={{margin : "auto"}}>
                <div className="row" style={{margin : "auto"}}>



                  <div class="col-xl-4 col-lg-4 col-md-5 col-sm-12 admin-card">
                    <div class="card twoCards">
                      <div class="card-body">
                        <div  style={{display :  "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                          <p class="card-title changeTitle">All User Visit your Website</p>
                          <Fab><GroupWorkIcon fontSize="large"/></Fab>
                        </div>
                          <p class="card-text"  style={{paddingLeft : "15px"}}>5</p>
                          <div style={{display :  "flex" , justifyContent : "flex-start" , alignItems : "center"}}>
                              <AssignmentTurnedInOutlinedIcon  style={{margin : "0px 15px 20px 0px" , fontSize :  "30" , color : "rgb(45, 206, 137)"}}/> 
                              <p>5 Delivered</p>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-4 col-md-5 col-sm-12 admin-card">
                    <div class="card twoCards">
                      <div class="card-body">
                        <div  style={{display :  "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                          <p class="card-title changeTitle">Checkout User Data</p>
                          <Fab><GroupWorkIcon fontSize="large"/></Fab>
                        </div>
                        <p class="card-text"  style={{paddingLeft : "15px"}}><Link to="/allcheckoutuser">See More</Link></p>
                          <div style={{display :  "flex" , justifyContent : "flex-start" , alignItems : "center"}}>
                              <AssignmentTurnedInOutlinedIcon  style={{margin : "0px 15px 20px 0px" , fontSize :  "30" , color : "rgb(45, 206, 137)"}}/> 
                              <p>{checkout.length} User Data</p>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-5 col-sm-12 admin-card">
                    <div class="card twoCards">
                      <div class="card-body">
                        <div  style={{display :  "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                          <p class="card-title changeTitle">Create New Product</p>
                          <Fab><GroupWorkIcon fontSize="large"/></Fab>
                        </div>
                          <p class="card-text"  style={{paddingLeft : "15px"}}><Link to="createProduct">Click here</Link></p>
                          <div style={{display :  "flex" , justifyContent : "flex-start" , alignItems : "center"}}>
                              <AssignmentTurnedInOutlinedIcon  style={{margin : "0px 15px 20px 0px" , fontSize :  "30" , color : "rgb(45, 206, 137)"}}/> 
                              <p>Total 5 Product Right Now </p>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-5 col-sm-12 admin-card">
                    <div class="card twoCards">
                      <div class="card-body">
                        <div  style={{display :  "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                          <p class="card-title changeTitle">Pending User Precipsion</p>
                          <Fab><GroupWorkIcon fontSize="large"/></Fab>
                        </div>
                          <p class="card-text"  style={{paddingLeft : "15px"}}>See More</p>
                          <div style={{display :  "flex" , justifyContent : "flex-start" , alignItems : "center"}}>
                              <AssignmentTurnedInOutlinedIcon  style={{margin : "0px 15px 20px 0px" , fontSize :  "30" , color : "rgb(45, 206, 137)"}}/> 
                              <p>5 Delivered</p>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-4 col-md-5 col-sm-12 admin-card">
                    <div class="card twoCards">
                      <div class="card-body">
                        <div  style={{display :  "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                          <p class="card-title changeTitle">Delivered Item</p>
                          <Fab><GroupWorkIcon fontSize="large"/></Fab>
                        </div>
                          <p class="card-text"  style={{paddingLeft : "15px"}}>See More</p>
                          <div style={{display :  "flex" , justifyContent : "flex-start" , alignItems : "center"}}>
                              <AssignmentTurnedInOutlinedIcon  style={{margin : "0px 15px 20px 0px" , fontSize :  "30" , color : "rgb(45, 206, 137)"}}/> 
                              <p>5 Delivered</p>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-xl-4 col-lg-4 col-md-5 col-sm-12 admin-card">
                    <div class="card twoCards">
                      <div class="card-body">
                        <div  style={{display :  "flex" , justifyContent : "space-between" , alignItems : "center"}}>
                          <p class="card-title changeTitle">All Product</p>
                          <Fab><GroupWorkIcon fontSize="large"/></Fab>
                        </div>
                          <p class="card-text"  style={{paddingLeft : "15px"}}><Link to="/allproduct">See More</Link></p>
                          <div style={{display :  "flex" , justifyContent : "flex-start" , alignItems : "center"}}>
                              <AssignmentTurnedInOutlinedIcon  style={{margin : "0px 15px 20px 0px" , fontSize :  "30" , color : "rgb(45, 206, 137)"}}/> 
                              <p>{product.length} Products</p>
                          </div>
                      </div>
                    </div>
                  </div>
                  


                </div>
              </div>
              
                


              <div className="container">
                <br/>
                <br/>
                <br/>
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-md-12">
                  <table className="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Upload</th>
                          <th scope="col">fullName</th>
                          <th scope="col">Email</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Pieces</th>
                          <th scope="col">Address</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        checkout.map((res,i)=>{
                              return <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td><img src={res.fullName} alt="Upload" style={{width : "200px" , height : "150px"}}/></td>
                                        <td>{res.fullName}</td>
                                        <td>{res.Email}</td>
                                        <td>{res.productName}</td>
                                        <td>{res.Phone}</td>
                                        <td>{res.Pieces}</td>
                                        <td>{res.Address}</td>
                                    </tr>
                          })
                      }

                        
                      </tbody>
                    </table>
                  </div>
                </div>
                <center>
                  <Link to="/allcheckoutuser">See More in Details</Link>
                </center>
              </div>

            </div>
    )
}
