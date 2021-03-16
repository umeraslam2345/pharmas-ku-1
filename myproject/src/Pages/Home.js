import React ,{useEffect , useState} from 'react'
import {Link} from "react-router-dom"


import blockCover from '../assets/images/hero_1.jpg';
import women from '../assets/images/women.jpg';
import children from '../assets/images/children.jpg';
import men from '../assets/images/men.jpg';

import cloth_1 from '../assets/images/cloth_1.jpg';
import shoe_1 from '../assets/images/shoe_1.jpg';
import cloth_2 from '../assets/images/cloth_2.jpg';
import cloth_3 from '../assets/images/cloth_3.jpg';
import blog_1 from '../assets/images/blog_1.jpg';





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






const Home = ( props ) => {
    const [Categories , setCategories] = useState([])
    const [Categories1 , setCategories1] = useState([])
    const [Homo , setHomo] = useState([])
    const [product , setproduct] = useState([])
    const [product1 , setproduct1] = useState([])

    useEffect(() =>{
  
        fetch("/AllProduct",{
       method: "GET",
        headers :  {
        "Content-Type" : "application/json" , 
    }
   })
   .then(res5=>res5.json())
   .then(res6=>{
    //    console.log(res6);
       setproduct(res6)
       const pro = res6.map((res7,i)=>{
        //    console.log(res7.Product_Popular );
           if ( res7.Product_Popular === "yes"){
            //    console.log(res7);
    //         // return setproduct1(...product1 , res3)
            return  res7
           }
       })

   })
    
    fetch("/AllCategories",{
       method: "GET",
        headers :  {
        "Content-Type" : "application/json" , 
    } ,
   })
   .then(res=>res.json())
   .then(res1=>{
    setCategories(res1)
    
    fetch("/AllProduct",{
        method: "GET",
         headers :  {
         "Content-Type" : "application/json" , 
     }
    })
    .then(res7=>res7.json())
    .then(res8=>{
        res8.map((res9,i)=>{
            res1.map((res10,i)=>{
                console.log(res9.Product_Catagories,res10.Categories);
                if (res9.Product_Catagories === res10){
                    setCategories1([{Product_Catagories : res9.Product_Catagories ,count : i+1}])
            }
        })
        })
        console.log(Categories1);
     //    console.log(res6);
    //     setproduct(res6)
    //     const pro = res6.map((res7,i)=>{
    //      //    console.log(res7.Product_Popular );
    //         if ( res7.Product_Popular === "yes"){
    //          //    console.log(res7);
    //  //         // return setproduct1(...product1 , res3)
    //          return  res7
    //         }
    //     })
 
    })
    // console.log(res1);
   })

    
    fetch("/AllHomomethtic",{
       method: "GET",
        headers :  {
        "Content-Type" : "application/json" , 
    } ,
   })
   .then(res3=>res3.json())
   .then(res4=>{
    setHomo(res4)
    // console.log(res4);
   })
 },[])

 const savethedetailproduct = (data) =>{
    localStorage.setItem("Data" , JSON.stringify(data) )
    console.log(data);
 }


 const cate =(Categories) =>{
        var Cat1 = Categories.split(" ").join("-")

        localStorage.setItem("Cate" , JSON.stringify(Categories) )
        
        setTimeout(()=>{
            props.history.push(`/shop/categories/${Cat1}`)
        },1500)
 }
        return (
            <div className="site-wrap">

                {/* <div className="site-blocks-cover" style={{ backgroundImage: `url(${blockCover})` }} data-aos="fade">
                    <div className="container">
                        <div className="row align-items-start align-items-md-center justify-content-end">
                            <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
                                <h1 className="mb-2">Finding Your Perfect Shoes</h1>
                                <div className="intro-text text-center text-md-left">
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla. </p>
                                    <p>
                                        <Link to='/shop'><div href="#" className="btn btn-sm btn-primary">Shop Now</div></Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}



                <div className="container-fuild" style={{width : "99% " ,padding : "0px 10px" }}>
                        <div className="row">

                            <div className="block-none-cato col-xl-2 col-lg-2">
                                <div className="border p-4 rounded mb-4" style={{background : "rgb(242, 242, 242)" , height : "300px"}}>
                                        <h3 className="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
                                        <ul className="list-unstyled mb-0">
                                        {
                                            Categories.map((res,i)=>{
                                                var Cat1 = res.Categories.split(" ").join("-")
                                                return( <li className="mb-1" key={i}>
                                                            <Link   onClick={()=>cate(res.Categories)} className="d-flex">
                                                                <span>{res.Categories}</span> 
                                                                {/* <span className="text-black ml-auto">(2,220)</span> */}
                                                            </Link>
                                                        </li>

                                                )

                                            })
                                        }
                                            {/* <li className="mb-1"><a href="#" className="d-flex"><span>Men</span> <span className="text-black ml-auto">(2,220)</span></a></li>
                                            <li className="mb-1"><a href="#" className="d-flex"><span>Women</span> <span className="text-black ml-auto">(2,550)</span></a></li>
                                            <li className="mb-1"><a href="#" className="d-flex"><span>Children</span> <span className="text-black ml-auto">(2,124)</span></a></li> */}
                                        </ul>
                                    </div>
                                </div>
                            <div className="col-xl-10 col-lg-10 col-md-12">
                                <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <img class="d-block w-100" src={blog_1} alt="First slide"  style={{height:"300px",borderRadius : "20px"}}/>
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={blog_1} alt="Second slide"   style={{height:"300px",borderRadius : "20px"}}/>
                                        </div>
                                        <div class="carousel-item">
                                            <img class="d-block w-100" src={blog_1} alt="Third slide"   style={{height:"300px",borderRadius : "20px"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>


                <div className="site-section block-3 site-blocks-2"  style={{background : "#66605b"}}>
                    <div className="container-fuild" style={{width : "98%"}}>
                        <div className="row justify-content-center">
                            <div className="col-md-7 site-section-heading text-center pt-4 ">
                                <h2 style={{color : "white",marginLeft : "-34px"}} >Popular Products</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 p-5">
                            <Carousel responsive={responsive}>
                            {
                                product.map((res,i)=>{
                                    if(res.Product_Popular && res.Product_Popular === "yes"){
                                        var Cat = res.Product_Catagories.split(" ").join("-")
                                        
                                        var Cat1 = res.Product_Name.split(" ").join("-")
                                        {/* console.log(Cat , Cat1) */}
                                        return (<div className="item" style={{margin : "5px 5px"}} key={i}>
                                        <div className="block-4 text-center">
                                            <figure className="block-3-image">
                                                <img src={res.Product_Image_Upload} alt="Image placeholder" style={{height : "210px" }}  className="img-fluid"/>
                                            </figure>
                                            <div className="block-4-text p-4">
                                                <h3><Link to='/shop'><div href="#">{res.Product_Name}</div></Link></h3>
                                                <p className="mb-0">{res.Product_Title}</p>
                                                <p className="text-primary font-weight-bold">{res.Product_Price}</p>
                                                <Link to={"/shop/categories/"+Cat+"/"+Cat1}  onClick={()=>savethedetailproduct(res)}><div className="btn btn-sm btn-primary">View</div></Link>

                                            </div>
                                        </div>
                                    </div>
                                    )
                                    }
                                    
                                })
                            }
                                   
                                   

                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>




                <div className="site-section site-section-sm site-blocks-1">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="">
                                <div className="icon mr-4 align-self-start">
                                    <span className="icon-truck"></span>
                                </div>
                                <div className="text">
                                    <h2 className="text-uppercase">Free Shipping</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="100">
                                <div className="icon mr-4 align-self-start">
                                    <span className="icon-refresh2"></span>
                                </div>
                                <div className="text">
                                    <h2 className="text-uppercase">Free Returns</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 d-lg-flex mb-4 mb-lg-0 pl-4" data-aos="fade-up" data-aos-delay="200">
                                <div className="icon mr-4 align-self-start">
                                    <span className="icon-help"></span>
                                </div>
                                <div className="text">
                                    <h2 className="text-uppercase">Customer Support</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus at iaculis quam. Integer accumsan tincidunt fringilla.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>














                <div className="site-section block-3 site-blocks-2" style={{background : "#66605b"}}>
                    <div className="container-fuild" style={{width : "98%"}} >
                        <div className="row justify-content-center">
                            <div className="col-md-7 site-section-heading text-center pt-4">
                                <h2 style={{color : "white",marginLeft : "-44px"}} >Homeopathic & Herbal Products</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 p-5">
                            <Carousel responsive={responsive}>
                                        {
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
                                        }
                                       
                                   

                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>




                <div className="container" style={{width : "99% " ,padding : "0px 10px"}}>
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12">
                                <div>
                                    <h1>Dawaai Pvt Ltd.</h1>
                                    <p>Dawaai is Pakistan’s leading digital healthcare pharmacy. Our platform enables you to order medicines online from the comfort of your home and get them delivered to your doorstep. Dawaai is the first internationally certified and registered healthcare merchant in Pakistan (LegitScript Certified). We pride ourselves in providing authentic medicines, equipment and supplements to our users. Over the years we have built trust in our customers by being accessible and providing authentic content to help them make better health choices.</p>
                                    <p>We serve patients and consumers all across Pakistan (Karachi, Lahore, Islamabad and more). From providing online medicines, lab tests, online doctor consultation and medical content Dawaai offers it all. Using our fast delivery service, you can get selected products within 2 hours of your order confirmation. Our mobile application is available on iOS and android.</p>
                                    <h4>ONLINE PHARMACY</h4>
                                    <p>Dawaai is an online pharmacy that sells medicines at a discounted rate offering the lowest price in Pakistan. The process works by uploading a prescription that our pharmacist will verify, creating an order for you. We offer medicines from reputable brands like Pfizer, GSK and Getz Pharma.</p>
                                    <h4>DOCTOR CONSULTATION</h4>
                                    <p>Dawaai’s Ask a Doctor service is safe and easy. We offer free chat and paid video consultations through appointments. We have a multi-disciplinary team of highly qualified doctors from General Physicians, gynecologists, Chest specialists, Dermatologists, Nutritionists to Cardiologists that give priority to patient doctor confidentiality.</p>
                                    <h4>LAB TESTS</h4>
                                    <p>Order online lab tests at discounted rates on the Dawaai website and application. We provide online patient reports and lab packages from CHS and Chughtai Labs.</p>
                                </div>
                            </div>
                        </div>
                </div>



                <div className="container">
                    <div className="row">
                            <div className="col-md-12">
                                <div className="site-section site-blocks-2">
                                    <div className="row justify-content-center text-center mb-5">
                                        <div className="col-md-7 site-section-heading pt-4">
                                            <h2>Categories</h2>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {Categories && Categories.map((res,i)=>{
                                            var Cat1 = res.Categories.split(" ").join("-")

                                            return(
                                                <div key={i} className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" style={{margin: "10px 0px"}} data-aos="fade" data-aos-delay="">
                                                    <Link className="block-2-item"  onClick={()=>cate(res.Categories)}>
                                                        <figure className="image">
                                                            <img src={women} alt="" className="img-fluid" />
                                                        </figure>
                                                        <div className="text">
                                                            <span className="text-uppercase">Collections</span>
                                                            <h3>{res.Categories}</h3>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                            
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


{/* 

                <div className="site-section site-blocks-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay="">
                                <a className="block-2-item" href="#">
                                    <figure className="image">
                                        <img src={women} alt="" className="img-fluid" />
                                    </figure>
                                    <div className="text">
                                        <span className="text-uppercase">Collections</span>
                                        <h3>Women</h3>
                                    </div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="100">
                                <a className="block-2-item" href="#">
                                    <figure className="image">
                                        <img src={children} alt="" className="img-fluid" />
                                    </figure>
                                    <div className="text">
                                        <span className="text-uppercase">Collections</span>
                                        <h3>Children</h3>
                                    </div>
                                </a>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-4 mb-5 mb-lg-0" data-aos="fade" data-aos-delay="200">
                                <a className="block-2-item" href="#">
                                    <figure className="image">
                                        <img src={men} alt="" className="img-fluid" />
                                    </figure>
                                    <div className="text">
                                        <span className="text-uppercase">Collections</span>
                                        <h3>Men</h3>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

 */}













































































{/* 
                <div className="site-section block-8">
                    <div className="container">
                        <div className="row justify-content-center  mb-5">
                            <div className="col-md-7 site-section-heading text-center pt-4">
                                <h2>Big Sale!</h2>
                            </div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col-md-12 col-lg-7 mb-5">
                                <a href="#"><img src={blog_1} alt="Image placeholder" className="img-fluid rounded" /></a>
                            </div>
                            <div className="col-md-12 col-lg-5 text-center pl-md-5">
                                <h2><a href="#">50% less in all items</a></h2>
                                <p className="post-meta mb-4">By <a href="#">Carl Smith</a> <span className="block-8-sep">&bullet;</span> September 3, 2018</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste dolor accusantium facere corporis ipsum animi deleniti fugiat. Ex, veniam?</p>
                                <p><Link to='/shop'><div className="btn btn-primary btn-sm">Shop Now</div></Link></p>
                            </div>
                        </div>
                    </div>
                </div> */}







            </div>
        )
    
}

export default Home;