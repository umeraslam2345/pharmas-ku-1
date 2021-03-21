import React ,{ useState, useEffect} from 'react'

const AllProduct = (props) => {
    const [data , setdata] = useState([])
    useEffect(() =>{
      if ( JSON.parse(localStorage.getItem("Admin")) ){
        fetch("/AllProduct",{
           method: "GET",
            headers :  {
            "Content-Type" : "application/json" , 
        } ,
       })
       .then(res=>res.json())
       .then(res2=>{
        setdata(res2)
        console.log(res2)
       })
      }
      else{
        props.history.push("/login")
      }
     },[])





     const deleteProduct = (id) =>{
        fetch("/deletePost/"+id ,{
          method: "DELETE" , 
          headers: {
            "Content-Type" : "application/json" ,
          }
        })
        .then(res=>res.json())
        .then(res2=>{
          const newData = data.filter(data=> data._id !== res2._id)
          setdata(newData)
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
                          <th scope="col">#</th>
                          <th scope="col">Product Image</th>
                          <th scope="col">Product Name</th>
                          <th scope="col">Product Title</th>
                          <th scope="col">Product Price</th>
                          <th scope="col">Product Catagories</th>
                          <th scope="col">doctor prescription</th>
                          <th scope="col">Product_Popular</th>
                          <th scope="col">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          data.map((res,i)=>{
                              return <tr key={i}>
                                        <th scope="row">{i+1}</th>
                                        <td><img src={res.Product_Image_Upload} alt="Upload" style={{width : "200px" , height : "150px"}}/></td>
                                        <td>{res.Product_Name}</td>
                                        <td>{res.Product_Title}</td>
                                        <td>{res.Product_Price}</td>
                                        <td>{res.Product_Catagories}</td>
                                        <td>{res.doctor_prescription}</td>
                                        <td>{res.Product_Popular}</td>
                                        <td><button className="btn btn-sm btn-primary" onClick={()=>deleteProduct(res._id)}>Delete</button></td>
                                    </tr>
                          })
                      }
                        {/* <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                          <td>@fat</td>
                        </tr> */}
                        
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
        </div>
    )
}

export default AllProduct