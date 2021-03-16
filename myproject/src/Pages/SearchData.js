import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';


import women from '../assets/images/women.jpg';

const SearchData = (props) =>{
    const [Product , setProduct] = useState([])
    const [Product1 , setProduct1] = useState([])
    const [Product2 , setProduct2] = useState([])
    const [Categories , setCategories] = useState([])
    const [fal , setFal] = useState(false)
    const [fal1 , setFal1] = useState(false)




    useEffect(() =>{
        var data2 = JSON.parse(localStorage.getItem("SearchData")) 
        
            setProduct(data2)
        setInterval(()=>{
             var data2 = JSON.parse(localStorage.getItem("SearchData")) 
            setProduct(data2)
        },3000)
       
                         
            fetch("/AllCategories",{
                method: "GET",
                    headers :  {
                    "Content-Type" : "application/json" , 
                } ,
            })
            .then(res4=>res4.json())
            .then(res5=>{
                setCategories(res5)
                // console.log(res1);
            })

    

},[])



useEffect(() => {
  
    return () => {
        clearInterval()
    }
  }, [])




const savethedetailproduct = (data) =>{
    localStorage.setItem("Data" , JSON.stringify(data) )
    console.log(data);
 }



const SortData1 = (a ,b) =>{
            setFal1(false)

          const Pro6 = Product.sort((a, b)=> {
                return parseFloat(a.Product_Price) - parseFloat(b.Product_Price)  
                
            });
            setProduct1(Pro6)
            setFal(true)
            console.log(Product1);



            
}
const SortData2 = (a ,b) =>{
    setFal(false)
          const Pro6 = Product.sort((a, b)=> {
            var nameA = a.Product_Name.toUpperCase(); 
            var nameB = b.Product_Name.toUpperCase(); 
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }

            return 0;
            });
            setProduct2(Pro6)
            setFal1(true)
            console.log(Product2);



            
}


const cate =(Categories) =>{
    var Cat1 = Categories.split(" ").join("-")

    localStorage.setItem("Cate" , JSON.stringify(Categories) )
    
    setTimeout(()=>{
        props.history.push(`/shop/categories/${Cat1}`)
    },1500)
}




        return (
            <div>

                <div className="bg-light py-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Shop</strong> <span className="mx-2 mb-0">/</span><strong>Search Product</strong> </div>
                        </div>
                    </div>
                </div>

                <div className="site-section">
                    <div className="container">

                        <div className="row mb-5">
                            <div className="col-md-9 order-2">

                                <div className="row">
                                    <div className="col-md-12 mb-5">
                                        <div className="float-md-left mb-4"><h2 className="text-black h5">Shop All</h2></div>
                                        <div className="d-flex">
                                            <div className="dropdown mr-1 ml-md-auto">
                                                <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuOffset" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    Latest
                                                </button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuOffset">
                                                {
                                                    Categories.map((res,i)=>{
                                                        var Cat1 = res.Categories.split(" ").join("-")
                                                        return(
                                                        <Link className="dropdown-item"  onClick={()=>cate(res.Categories)}>{res.Categories}</Link>

                                                        )
                                                    })

                                                }
                                                    {/* <Link className="dropdown-item" href="#">Women</a>
                                                    <Link className="dropdown-item" href="#">Children</a> */}
                                                </div>
                                            </div>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuReference" data-toggle="dropdown">Reference</button>
                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                                    <a className="dropdown-item">Relevance</a>
                                                    <a className="dropdown-item" onClick={()=>SortData2("A","Z")}>Name, A to Z</a>
                                                    {/* <a className="dropdown-item" onClick={()=>SortData3("A","Z")}>Name, Z to A</a> */}
                                                    <div className="dropdown-divider"></div>
                                                    <a className="dropdown-item" onClick={()=>SortData1("1","100")}>Price, low to high</a>
                                                    {/* <a className="dropdown-item" onClick={()=>SortData("100","1")}>Price, high to low</a> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    {!fal ? !fal1 ? Product.length >= 1? Product.map((res,i)=>{
                                        var Cat = res.Product_Catagories.split(" ").join("-")
                                        var Cat1 = res.Product_Name.split(" ").join("-")
                                        return(
                                            <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                                                <div className="block-4 text-center border">
                                                    <figure className="block-4-image">
                                                    <Link to='/detail'><img src={res.Product_Image_Upload}  style={{height : "210px" , width : "200px" }}  alt="Image placeholder" className="img-fluid" /></Link>
                                                    </figure>
                                                    <div className="block-4-text p-4">
                                                        <h3><Link to='/shop'>{res.Product_Name}</Link></h3>
                                                        <p className="mb-0">{res.Product_Title}</p>
                                                        <p className="text-primary font-weight-bold">{res.Product_Price}</p>
                                                        <Link to={"/shop/categories/"+Cat+"/"+Cat1}   onClick={()=>savethedetailproduct(res)}><div className="btn btn-sm btn-primary">View</div></Link>

                                                    </div>
                                                </div>
                                            </div> 

                                        )
                                    })   :
                                    <div className="col-sm-12 col-lg-12 mb-12"><center> <h3> No Search Product</h3></center> </div>:
                                     Product2.map((res,i)=>{
                                        var Cat = res.Product_Catagories.split(" ").join("-")
                                        var Cat1 = res.Product_Name.split(" ").join("-")
                                        return(
                                            <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                                                <div className="block-4 text-center border">
                                                    <figure className="block-4-image">
                                                    <Link to='/detail'><img src={res.Product_Image_Upload}  style={{height : "210px" , width : "200px" }}  alt="Image placeholder" className="img-fluid" /></Link>
                                                    </figure>
                                                    <div className="block-4-text p-4">
                                                        <h3><Link to='/shop'>{res.Product_Name}</Link></h3>
                                                        <p className="mb-0">{res.Product_Title}</p>
                                                        <p className="text-primary font-weight-bold">{res.Product_Price}</p>
                                                        <Link to={"/shop/categories/"+Cat+"/"+Cat1}   onClick={()=>savethedetailproduct(res)}><div className="btn btn-sm btn-primary">View</div></Link>

                                                    </div>
                                                </div>
                                            </div> 

                                        )
                                    })            : Product1.map((res,i)=>{
                                        var Cat = res.Product_Catagories.split(" ").join("-")
                                        var Cat1 = res.Product_Name.split(" ").join("-")
                                        return(
                                            <div className="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                                                <div className="block-4 text-center border">
                                                    <figure className="block-4-image">
                                                    <Link to='/detail'><img src={res.Product_Image_Upload}  style={{height : "210px" , width : "200px" }}  alt="Image placeholder" className="img-fluid" /></Link>
                                                    </figure>
                                                    <div className="block-4-text p-4">
                                                        <h3><Link to='/shop'>{res.Product_Name}</Link></h3>
                                                        <p className="mb-0">{res.Product_Title}</p>
                                                        <p className="text-primary font-weight-bold">{res.Product_Price}</p>
                                                        <Link to={"/shop/categories/"+Cat+"/"+Cat1}   onClick={()=>savethedetailproduct(res)}><div className="btn btn-sm btn-primary">View</div></Link>

                                                    </div>
                                                </div>
                                            </div> 

                                        )
                                    })                                    
                                                                         }
                                    


                                </div>
                                {/* <div className="row" data-aos="fade-up">
                                    <div className="col-md-12 text-center">
                                        <div className="site-block-27">
                                            <ul>
                                                <li><a onClick={()=>SortData()}>&lt;</a></li>
                                                <li className="active"><span>1</span></li>
                                                <li><a href="#">2</a></li>
                                                <li><a href="#">3</a></li>
                                                <li><a href="#">4</a></li>
                                                <li><a href="#">5</a></li>
                                                <li><a href="#">&gt;</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div> */}
                            </div>

                            <div className="col-md-3 order-1 mb-5 mb-md-0">
                                <div className="border p-4 rounded mb-4">
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
                                    </ul>
                                </div>

                                <div className="border p-4 rounded mb-4">
                                    <div className="mb-4">
                                        <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
                                        <div id="slider-range" className="border-primary"></div>
                                        {/* <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled="" /> */}
                                        <button  className="btn btn-sm btn-primary" onClick={()=>SortData1("A","Z")}> Low to High</button>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Alphabets</h3>
                                        <div id="slider-range" className="border-primary"></div>
                                        {/* <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled="" /> */}
                                        <button  className="btn btn-sm btn-primary"  onClick={()=>SortData2("A","Z")}> A to Z</button>
                                    </div>

                                    {/* <div className="mb-4">
                                        <h3 className="mb-3 h6 text-uppercase text-black d-block">Size</h3>
                                        <label htmlFor="s_sm" className="d-flex">
                                            <input type="checkbox" id="s_sm" className="mr-2 mt-1" /> <span className="text-black">Small (2,319)</span>
                                        </label>
                                        <label htmlFor="s_md" className="d-flex">
                                            <input type="checkbox" id="s_md" className="mr-2 mt-1" /> <span className="text-black">Medium (1,282)</span>
                                        </label>
                                        <label htmlFor="s_lg" className="d-flex">
                                            <input type="checkbox" id="s_lg" className="mr-2 mt-1" /> <span className="text-black">Large (1,392)</span>
                                        </label>
                                    </div>

                                    <div className="mb-4">
                                        <h3 className="mb-3 h6 text-uppercase text-black d-block">Color</h3>
                                        <a href="#" className="d-flex color-item align-items-center" >
                                            <span className="bg-danger color d-inline-block rounded-circle mr-2"></span> <span className="text-black">Red (2,429)</span>
                                        </a>
                                        <a href="#" className="d-flex color-item align-items-center" >
                                            <span className="bg-success color d-inline-block rounded-circle mr-2"></span> <span className="text-black">Green (2,298)</span>
                                        </a>
                                        <a href="#" className="d-flex color-item align-items-center" >
                                            <span className="bg-info color d-inline-block rounded-circle mr-2"></span> <span className="text-black">Blue (1,075)</span>
                                        </a>
                                        <a href="#" className="d-flex color-item align-items-center" >
                                            <span className="bg-primary color d-inline-block rounded-circle mr-2"></span> <span className="text-black">Purple (1,075)</span>
                                        </a>
                                    </div> */}

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
                                                <div className="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" style={{margin: "10px 0px"}} data-aos="fade" data-aos-delay="">
                                                    <Link className="block-2-item"  onClick={()=>cate(res.Categories)} >
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







                        

                    </div>
                </div>
            </div>
        )
    }

export default SearchData
