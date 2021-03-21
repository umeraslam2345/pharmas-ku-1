import React,{useState  ,useEffect} from 'react'
import { Link } from 'react-router-dom'

const EditCart = (props) => {

    const [data  ,setData ] = useState([])
    const [peice , setpeice] = useState(1)
    const [cart , setCart] = useState([])
    const [total , settotal] = useState(0)
    const [total1 , settotal1] = useState(0)



    useEffect(() =>{
        window.scrollTo(0, 0)
        console.log(props);
      

        let data =  JSON.parse(localStorage.getItem("Cart")) 
        if(data){
            const pro = data.filter((res,i)=>{
                return res._id === props.match.params.productId
            })
            console.log(pro);
            setCart(pro)
            // setpeice(pro[0].price)

        }
        else      setCart(0)

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



  },[])



  const minus=()=>{
    if(peice > 1)
    setpeice(peice - 1)
    console.log(peice);
}
const plus=()=>{
    if(peice < 100)
    setpeice(peice + 1)
    console.log(peice);

}





  const NextDatas = (id) =>{
    let data3 =  JSON.parse(localStorage.getItem("Cart")) 
    const pro = data3.filter((res,i)=>{
        return res._id !== cart[0]._id
    })
    console.log(data3);
    const data = {
        ...cart[0],
        price : peice ,
        Product_Price : cart[0].Product_Price * peice
    }
    pro.push(data)
    console.log(data3,pro , data);
    localStorage.setItem("Cart",JSON.stringify(pro))
    props.history.push("/card")
  }
   



    return (
        <div>
        <div className="bg-light py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-0"><Link to="/">Home</Link>  <span className="mx-2 mb-0">/</span> <strong className="text-black">Edit Cart</strong></div>
                </div>
            </div>
        </div>

        <div className="site-section">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-md-12">
                        <div className="site-blocks-table">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className="product-thumbnail">Image</th>
                                        <th className="product-name">Product</th>
                                        <th className="product-price">Price</th>
                                        <th className="product-quantity">Quantity</th>
                                        <th className="product-total">Total</th>
                                        {/* <th className="product-total">Edit</th> */}
                                        <th className="product-remove">Updated</th>
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
                                                                <td><button onClick={()=>plus()} className="btn btn-primary btn-sm">+</button></td>
                                                                <input type="text" className="form-control text-center"  value={peice} onChange={(e)=>setpeice(e.target.value)}  min="1" max="100" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                            <td><button onClick={()=>minus()} className="btn btn-primary btn-sm">-</button></td>

                                                            </center>

                                                        </div>

                                                    </td>
                                                    <td>Rs {item.Product_Price * peice}</td>
                                                    {/* <td><button onClick={()=>EditCart(item._id)} className="btn btn-primary btn-sm">Edit</button></td> */}
                                                    <td><button onClick={()=>NextDatas(item._id)} className="btn btn-primary btn-sm">Next</button></td>
                                                </tr>
                                            )
                                    }) : <tr><td colSpan="6"><div className="col-sm-12 col-lg-12 mb-12"><center> <h3> No Product in Card</h3></center> </div></td></tr> 
                               }
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

               
            </div>
        </div>
    </div>
    )
}

export default EditCart
