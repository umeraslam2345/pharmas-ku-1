import React , {useState , useEffect} from 'react';
import { Link , Redirect ,useHistory } from 'react-router-dom';


import logo from '../assets/images/logo1.png';


import { useSelector, useDispatch } from 'react-redux';


const Header =(props)=> {


    const [search , setSearch] = useState("")
    const [DataPart2 , setDataPart2] = useState([])
    let history = useHistory();


    useEffect(() =>{
        setInterval(()=>{
            var data1 =  JSON.parse(localStorage.getItem("Cart")) 
         if (data1) {
             setDataPart2(data1)
            //  const data = DataPart2.length  
            //  setDataPart2(data)
            }
         else setDataPart2(0)
        },3000)
        
  },[])
  



    const SubmitData = (e) =>{
        e.preventDefault()
        fetch("http://localhost:3000/SearchProduct",{
                                method: "POST",
                                headers :  {
                                    "Content-Type" : "application/json" , 
                                } ,
                                body : JSON.stringify({
                                    search : search.toLowerCase() ,
   
                                })
                            })
                            .then(res=>res.json())
                            .then((res1)=>{ 
                                console.log(res1)    
                                // localStorage.setItem("SearchData" , JSON.stringify(res1) )
                                // props.history.push(`/shop/search/product-item`)

                                const SearchProductItem = []
                                
                                res1.map((res2,i)=>{
                                    // console.log(res2)
                                    var Name = res2.Product_Name.toLowerCase().split(" ")
                                     var Title = res2.Product_Title.toLowerCase().split(" ")
                                    // console.log(Name , Title)
                                    Name.map((res3,i)=>{

                                        if (res3 === search.toLowerCase().trim()){
                                            SearchProductItem.unshift(res2)
                                        }
                                    })
                                    Title.map((res4,i)=>{
                                        if (res4 === search.toLowerCase().trim()){
                                            SearchProductItem.unshift(res2)
                                        }
                                    })
                                })
                                console.log(SearchProductItem,props)
                                localStorage.setItem("SearchData" , JSON.stringify(SearchProductItem) )
                                
                                setTimeout(()=>{
                                    history.push("/shop/search/product-item");

                                    // return <Redirect push to="/shop/search/product-item" /> 
                                    // props.history.push(`/shop/search/product-item`)
                                },1000)
                        })
                        .catch(err=>{
                            // swal("There is An Error")                  
                            }) 
    }

    const basket = useSelector((state) => state.basket);
        
        return (
            <header className="site-navbar" role="banner" >

                <div className="site-navbar-top">
                    <div className="container">
                        <div className="row align-items-center">


                            <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                                <form className="site-block-top-search" onSubmit={(e)=>SubmitData(e)}>
                                    <span className="icon icon-search2"></span>
                                    <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="form-control border-0" placeholder="Search Medicines..." />
                                </form>
                            </div>

                            <div className="col-12 mb-3 mb-md-0 col-md-4 col-lg-4 col-sm-4 order-1 order-md-2 text-center">
                                <div className="site-logo">
                                    <Link to="/" className="js-logo-clone"> <img src={logo} className="logo-img" alt=""/> </Link>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                                <div className="site-top-icons">
                                    <ul>
                                        <li><Link to="/login/user"><span className="icon icon-person"></span></Link></li>
                                        <li><Link to="/favorite-product"><span className="icon icon-heart-o"></span></Link></li>
                                        <li>
                                            <Link to="/card" className="site-cart">
                                                <span className="icon icon-shopping_cart"></span>
                                                <span className="count">{DataPart2.length}</span>
                                            </Link>
                                        </li>
                                        <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu"></span></a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <nav className="site-navigation text-right text-md-center" role="navigation">
                    <div className="container">
                        <ul className="site-menu js-clone-nav d-none d-md-block">
                            <li className="active">
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li> <Link to="/shop">Shop</Link></li>
                            <li><Link to="/checkout">Checkout</Link></li>
                            <li> <Link to="/contact">Contact</Link></li>
                            
                        </ul>
                    </div>
                </nav>
            </header>
        )
}

export default Header;