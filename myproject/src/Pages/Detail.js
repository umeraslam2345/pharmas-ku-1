import React, { useEffect , useState } from 'react';
import swal from 'sweetalert';
import cloth_1 from '../assets/images/cloth_1.jpg';
import shoe_1 from '../assets/images/shoe_1.jpg';
import cloth_2 from '../assets/images/cloth_2.jpg';
import cloth_3 from '../assets/images/cloth_3.jpg';

import { Link , Redirect} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};


export function Detail(props) {
    const [productDetail , setproductDetail] = useState([])
    const [Price , setPrice] = useState(1)
    const [DataPart2 , setDataPart2] = useState([])


    useEffect(() =>{
        
      var data =  JSON.parse(localStorage.getItem("Data")) 
      if (data) setproductDetail(data)
      var data1 =  JSON.parse(localStorage.getItem("Cart")) 
       if (data1) setDataPart2(data1)
},[])

const minus=()=>{
        if(Price > 1)
        setPrice(Price - 1)
        console.log(Price);
    }
    const plus=()=>{
        if(Price < 100)
        setPrice(Price + 1)
        console.log(Price);

    }
const addtocartproduct = () =>{
    if(productDetail){
        
        const data =  {...productDetail ,
                         price : Price ,
                         Product_Price  : productDetail.Product_Price * Price }
        var data1 = JSON.parse(localStorage.getItem("Cart")) 
        if (data1){
            var data3 = data1.map((item) => {
                if(item._id === data._id){
;                   localStorage.setItem("double",JSON.stringify(true))
                    return {...item,
                         price : Price + item.price,
                         Product_Price  : (productDetail.Product_Price * Price )+ item.Product_Price}
                }
                else{
                    return item
                }

            })
            var data5 =  JSON.parse(localStorage.getItem("double")) 
            console.log(DataPart2.length, data3.length,data5);
            if(DataPart2.length=== data3.length && data5){
                localStorage.removeItem("double")
                localStorage.setItem("Cart" , JSON.stringify(data3) )
            }
            else{
                var data2 = [...data1 , data]
           localStorage.setItem("Cart" , JSON.stringify(data2) )
            }
        }
        else{
            localStorage.setItem("Cart" , JSON.stringify([data]) )
        }
        // setTimeout(()=>{
            // props.history.push("/card")
        //   <Redirect to="/card" /> 
        // },1500)
    }

}

    const piece = useSelector((state) => state.piece);
    const dispatch = useDispatch();
    return (
        <div>
            <div className="bg-light py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">{productDetail.Product_Name}</strong></div>
                    </div>
                </div>
            </div>

            <div className="site-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={productDetail.Product_Image_Upload} alt="Image" className="img-fluid" />
                        </div>
                        <div className="col-md-6">
                            <h2 className="text-black">{productDetail.Product_Name}</h2>
                            <h4 className="text-primary h4">{productDetail.Product_Title}</h4>
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur, vitae, explicabo? Incidunt facere, natus soluta dolores iusto! Molestiae expedita veritatis nesciunt doloremque sint asperiores fuga voluptas, distinctio, aperiam, ratione dolore.</p> */}
                            <p className="mb-4">{productDetail.Product_Short_Notes}</p>
                            <p><strong className="text-primary h4">Rs : {productDetail.Product_Price}</strong></p>
                            {/* <div className="mb-1 d-flex">
                                <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                                    <span className="d-inline-block mr-2" style={{ top: "-2px", position: "relative" }}><input type="radio" id="option-sm" name="shop-sizes" /></span> <span className="d-inline-block text-black">Small</span>
                                </label>
                                <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                                    <span className="d-inline-block mr-2" style={{ top: "-2px", position: "relative" }}><input type="radio" id="option-md" name="shop-sizes" /></span> <span className="d-inline-block text-black">Medium</span>
                                </label>
                                <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                                    <span className="d-inline-block mr-2" style={{ top: "-2px", position: "relative" }}><input type="radio" id="option-lg" name="shop-sizes" /></span> <span className="d-inline-block text-black">Large</span>
                                </label>
                                <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                                    <span className="d-inline-block mr-2" style={{ top: "-2px", position: "relative" }}><input type="radio" id="option-xl" name="shop-sizes" /></span> <span className="d-inline-block text-black"> Extra Large</span>
                                </label>
                            </div> */}
                            <div className="mb-5">
                                <div className="input-group mb-3" style={{ maxWidth: "120px" }} >
                                    <div className="input-group-prepend">
                                        <button className="btn btn-outline-primary js-btn-minus" type="button"  onClick = {()=>minus()}>&#8722;</button>
                                    </div>
                                    <input type="text" className="form-control text-center"  value={Price} onChange={(e)=>setPrice(e.target.value)}  min="1" max="100" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-primary js-btn-plus" type="button" onClick={()=>plus()}>&#43;</button>
                                    </div>
                                </div>

                            </div>
                            <p><div className="buy-now btn btn-sm btn-primary" onClick={() => addtocartproduct()}>Add To Cart</div></p>

                        </div>
                    </div>
                </div>
            </div>



            <div className="container" style={{width : "99% " ,padding : "0px 10px"}}>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12" style={{lineHeight : "35px"}}>
                                <div>
                                {
                                    productDetail.Product_Long_Notes
                                }
                                </div>
                            </div>
                        </div>
                </div>















                <div className="site-section block-3 site-blocks-2 bg-light">
                    <div className="container-fuild" style={{width : "97%"}}>
                        <div className="row justify-content-center">
                            <div className="col-md-7 site-section-heading text-center pt-4">
                                <h2>Featured Products</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 p-5">
                            <Carousel responsive={responsive}>






                            <div className="item" style={{margin : "5px 5px"}}>
                                        <div className="block-4
                                         text-center">
                                            <figure className="block-4-image">
                                                <img src={shoe_1} alt="Image placeholder" style={{height : "210px" }}  className="img-fluid" />
                                            </figure>
                                            <div className="block-4-text p-4">
                                                <h3><Link to='/shop'><div href="#">Corater</div></Link></h3>
                                                <p className="mb-0">Finding perfect products</p>
                                                <p className="text-primary font-weight-bold">$50</p>
                                                <Link to='/shop'><div href="#" className="btn btn-sm btn-primary">View</div></Link>

                                            </div>
                                        </div>
                                    </div><div className="item" style={{margin : "5px 5px"}}>
                                        <div className="block-4
                                         text-center">
                                            <figure className="block-4-image">
                                                <img src={shoe_1} alt="Image placeholder" style={{height : "210px" }}  className="img-fluid" />
                                            </figure>
                                            <div className="block-4-text p-4">
                                                <h3><Link to='/shop'><div href="#">Corater</div></Link></h3>
                                                <p className="mb-0">Finding perfect products</p>
                                                <p className="text-primary font-weight-bold">$50</p>
                                                <Link to='/shop'><div href="#" className="btn btn-sm btn-primary">View</div></Link>

                                            </div>
                                        </div>
                                    </div>
                                        {/* {
                                            Homo.map((res,i)=>{
                                                var Cat = res.Product_Catagories.split(" ").join("-")
                                        
                                                var Cat1 = res.Product_Name.split(" ").join("-")
                                                return (
                                                     <div className="item" style={{margin : "5px 5px"}} key={i}>
                                                        <div className="block-4 text-center">
                                                            <figure className="block-3-image">
                                                                <img src={res.Product_Image_Upload} alt="Image placeholder" style={{height : "210px" }}  className="img-fluid"/>
                                                            </figure>
                                                            <div className="block-4-text p-4">
                                                                <h3><Link to='/shop'><div href="#">{res.Product_Name}</div></Link></h3>
                                                                <p className="mb-0">{res.Product_Title}</p>
                                                                <p className="text-primary font-weight-bold">{res.Product_Price}</p>
                                                                <Link to={"/shop/categories/"+Cat+"/"+Cat1} onClick={()=>savethedetailproduct(res)}><div href="#" className="btn btn-sm btn-primary">View</div></Link>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        } */}
                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>




            <div className="site-section block-3 site-blocks-2 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 site-section-heading text-center pt-4">
                            <h2>Featured Products</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="nonloop-block-3 owl-carousel">
                                <div className="item">
                                    <div className="block-4 text-center">
                                        <figure className="block-4-image">
                                            <img src={shoe_1} alt="Image placeholder" className="img-fluid" />
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3><a href="#">Tank Top</a></h3>
                                            <p className="mb-0">Finding perfect t-shirt</p>
                                            <p className="text-primary font-weight-bold">$50</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="block-4 text-center">
                                        <figure className="block-4-image">
                                            <img src={cloth_2} alt="Image placeholder" className="img-fluid" />
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3><a href="#">Corater</a></h3>
                                            <p className="mb-0">Finding perfect products</p>
                                            <p className="text-primary font-weight-bold">$50</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="block-4 text-center">
                                        <figure className="block-4-image">
                                            <img src={cloth_3} alt="Image placeholder" className="img-fluid" />
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3><a href="#">Polo Shirt</a></h3>
                                            <p className="mb-0">Finding perfect products</p>
                                            <p className="text-primary font-weight-bold">$50</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="block-4 text-center">
                                        <figure className="block-4-image">
                                            <img src={shoe_1} alt="Image placeholder" className="img-fluid" />
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3><a href="#">T-Shirt Mockup</a></h3>
                                            <p className="mb-0">Finding perfect products</p>
                                            <p className="text-primary font-weight-bold">$50</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="block-4 text-center">
                                        <figure className="block-4-image">
                                            <img src={cloth_2} alt="Image placeholder" className="img-fluid" />
                                        </figure>
                                        <div className="block-4-text p-4">
                                            <h3><a href="#">Corater</a></h3>
                                            <p className="mb-0">Finding perfect products</p>
                                            <p className="text-primary font-weight-bold">$50</p>
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

export default Detail;