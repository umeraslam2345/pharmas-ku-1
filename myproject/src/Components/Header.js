import React , {useState , useEffect} from 'react';
import { Link  ,useHistory } from 'react-router-dom';


import logo from '../assets/images/logo1.png';


import { useSelector, useDispatch } from 'react-redux';


const Header =(props)=> {


    const [search , setSearch] = useState("")
    const [DataPart2 , setDataPart2] = useState([])
    const [UserDatat , setUserDatat] = useState({})
    const [userHeader , setuserHeader] = useState(false)
    const [menu1 , setmenu1] = useState(false)
    const [adminHeader , setadminHeader] = useState(false)
    let history = useHistory();


    useEffect(() =>{

        if ( JSON.parse(localStorage.getItem("Admin")) ){
            setadminHeader(true)
            setuserHeader(false)
            setUserDatat([])
        }
        else if ( JSON.parse(localStorage.getItem("User"))  ){
            setuserHeader(true)
            setadminHeader(false)
            setUserDatat(JSON.parse(localStorage.getItem("User")))
        }
        else{
            setadminHeader(false)
            setUserDatat([])
            setuserHeader(false)

        }
        const inter = setInterval(()=>{
            if ( JSON.parse(localStorage.getItem("Admin")) ){
            setadminHeader(true)
            setuserHeader(false)
            setUserDatat([])
        }
        else if ( JSON.parse(localStorage.getItem("User"))  ){
            setuserHeader(true)
            setadminHeader(false)
            setUserDatat(JSON.parse(localStorage.getItem("User")))
        }
        else{
            setadminHeader(false)
            setUserDatat([])
            setuserHeader(false)

        }

            var data1 =  JSON.parse(localStorage.getItem("Cart")) 
         if (data1) {
             setDataPart2(data1)
            //  const data = DataPart2.length  
            //  setDataPart2(data)
            }
         else setDataPart2(0)
         if ( JSON.parse(localStorage.getItem("Admin")) ){
            setadminHeader(true)
        }
        if ( JSON.parse(localStorage.getItem("User")) ||  JSON.parse(localStorage.getItem("Admin")) ){
            setuserHeader(true)
        }
        },3000)
        return () => clearInterval(inter);

  },[])
  



const headerMenu = () =>{
    if (!menu1){
        localStorage.setItem("head" , JSON.stringify("1000"))
        document.getElementById("my1").classList.remove("offcanvas-menu")
        // const sb = document.getElementById("myDIv")
        // sb.classList.remove("active")
        setmenu1(true)
    }
    else{
        localStorage.removeItem("head")
        document.getElementById("my1").classList.remove("offcanvas-menu")
        // const sb = document.getElementById("myDIv")
        // sb.classList.add("active")
        setmenu1(false) 
    }
    
}




    const SubmitData = (e) =>{
        e.preventDefault()

        fetch("/SearchProduct",{
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

    const clickLogin = ()=>{
        localStorage.removeItem("Admin")
        localStorage.removeItem("User")
        localStorage.removeItem("Cart")
        
        history.push("/login")
    }
    const basket = useSelector((state) => state.basket);
        
        return (
            <>
                <header className="site-navbar" role="banner">

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
                                            {/* <li><Link to="/favorite-product"><span className="icon icon-heart-o"></span></Link></li> */}
                                            <li>
                                                <Link to="/card" className="site-cart">
                                                    <span className="icon icon-shopping_cart"></span>
                                                    <span className="count">{DataPart2.length ? DataPart2.length : 0}</span>
                                                </Link>
                                            </li>
                                            {!userHeader ?
                                            <li><Link to="/login"><span className="icon icon-person"  style={{ fontSize : "23px"}} ></span></Link></li>
                                            :
                                            <li><p onClick={()=>clickLogin()}><span class="iconify" style={{marginTop :  "-15px" , fontSize : "19px"}} data-icon="ls:logout" data-inline="false"></span></p></li>
                                            }
                                            {/* <li className="d-inline-block ml-md-0" style={{fontSize : "20px" ,paddingLeft : "10px"}}><a onClick={()=>headerMenu()} className="nav-mobile" id="myDIv"><span className="icon-history"></span></a></li> */}
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <nav className="site-navigation text-right text-md-center" style={{paddingRight : "-15%"}}>
                        <div className="container">
                        {
                            adminHeader 
                            ? 
                            <ul className="site-menu js-clone-nav">
                                <li className="active">
                                    <Link to="/admin">Home</Link>
                                </li>
                                <li>
                                    <Link to="/forget-pass-admin">Forgot Password</Link>
                                </li>
                                <li> <Link to="/login-admin">Login</Link></li>
                                <li><Link onClick={()=>clickLogin()}>Logout</Link></li>
                                {/* <li> <Link to="/contact">Contact</Link></li> */}
                            </ul>
                            : 
                            <>
                            {UserDatat && userHeader  ?
                            <center> <p>Welcome <b>{UserDatat.user }</b> </p></center>
                                : ""
                            }
                            <ul className="site-menu js-clone-nav">
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
                            </>
                        }
                            
                        </div>
                    </nav>
                </header>
                {/* <div>
                    h1
                </div> */}
                {/* <div className="mobile-header-1 d-md-none">
                    <ul className="uli">
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
                </div> */}
            </>
        )
}

export default Header;