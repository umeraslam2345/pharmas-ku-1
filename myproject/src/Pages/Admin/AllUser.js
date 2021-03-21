import React,{useState,useEffect} from 'react'

const AllUser =  (props)=> {
    const [ data  , setData] = useState([])
    
    useEffect(() =>{
        if ( JSON.parse(localStorage.getItem("Admin")) ){
          fetch("/userall",{
             method: "GET",
              headers :  {
              "Content-Type" : "application/json" , 
          } ,
         })
         .then(res=>res.json())
         .then(res2=>{
             const pro = []
             res2.map((res3,i)=>{
                if ( res3.email !== "projectpharma874@gmail.com"){
                    pro.push(res3)
                }
             })
            setData(pro)
          console.log(pro)
         })
        }
        else{
          props.history.push("/login")
        }
       },[])
  
  

       const deleteProduct = (id) =>{
        fetch("/deleteUser/"+id ,{
          method: "DELETE" , 
          headers: {
            "Content-Type" : "application/json" ,
          }
        })
        .then(res=>res.json())
        .then(res2=>{
          const newData = data.filter(data=> data._id !== res2._id)
          setData(newData)
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
                                            <th scope="col">fullName</th>
                                            <th scope="col">Email</th>

                                            <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            data && data.map((res,i)=>{

                                                      return (<>
                                                            <tr key={i}>
                                                                <td>{i+1}</td>
                                                                <td>{res.user}</td>
                                                                <td>{res.email}</td>
                                                                {/* <td>{res.Date}</td> */}
                                                                {/* <td>{res.Address}</td>
                                                                <td>{res.Address1}</td>
                                                                <td>{res.StateCountry}</td>
                                                                <td>{res.Select_Country}</td>
                                                                <td>{res.ZipPostal}</td>
                                                                <td>{res.Order_Notes}</td> */}
                                                                <td><button className="btn btn-sm btn-primary" onClick={()=>deleteProduct(res._id)}>Delete</button></td>
                                                            </tr>
                                                            
                                                      
                                                        
                                                        </>
                                                        )
                                               
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

export default AllUser
