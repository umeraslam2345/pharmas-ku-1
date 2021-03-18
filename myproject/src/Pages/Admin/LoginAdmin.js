import React,{useState ,useEffect} from 'react'
import { Link } from 'react-router-dom';
import swal from 'sweetalert';




const LoginAdmin  =(props)=> {
    const [email , setemail] = useState("")
    const [pass , setpass] = useState("")


    useEffect(() => {
      if ( JSON.parse(localStorage.getItem("Admin")) )
        props.history.push("/admin")
      
           }, [])
  

const postData = (e) =>{
    e.preventDefault()
    if(email.length === 0){
        if (email === "projectpharma874@gmail.com")
        swal("Enter The Correct Email !" )
           return
        }
     if(pass.length === 0){
        swal("Enter The Password !"  )
           return
         }
      fetch("/logIn",{
        method: 'POST' , 
        headers :  {
          "Content-Type" : "application/json" , 
        } , 
        body : JSON.stringify({
          email  ,
          pass  ,
        })
      })
      .then((res)=>res.json())
      .then((res2)  =>{
          console.log(res2)
          if (res2 !== null && !res2.Error  ){
            swal("SucessFully Login"  )
            localStorage.setItem("Admin" , JSON.stringify("Yes") )
                props.history.push("/admin")
          }
          else{
            swal("Email & Password are Incorrect Plz Try Again !"  )
          }
        // console.log(res2)
      })
      .catch((err)=>console.log(err))

}





    return (
        <div className="container" style={{width : "40%" , margin : "50px auto"}}>
            <form  onSubmit={(e)=>postData(e)}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email"  value={email} onChange={(e)=>setemail(e.target.value)}  className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password"   value={pass} onChange={(e)=>setpass(e.target.value)}  className="form-control" placeholder="Enter password" />
                </div>
            <br/>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <Link to="/forget-pass-admin">password?</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginAdmin
