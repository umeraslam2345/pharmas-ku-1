import React,{Component} from 'react'
import swal from 'sweetalert';


export default class forgetPass extends Component {
    
    state ={
        email : "",
        pass : "",
        code : 0,
        Code1 : 0,
        dis1 : false,
        dis2 : false,
    }


    //  postData = (e) =>{
    //     e.preventDefault()
    //     if(this.state.email.length === 0){
    //         if (this.state.email === "projectpharma874@gmail.com")
    //         swal("Enter The Correct Email !" )
    //            return
    //         }
    //      if(this.state.pass.length === 0){
    //         swal("Enter The Password !"  )
    //            return
    //          }
    //       fetch("/logIn",{
    //         method: 'POST' , 
    //         headers :  {
    //           "Content-Type" : "application/json" , 
    //         } , 
    //         body : JSON.stringify({
    //           email :this.state.email ,
    //           pass :this.state.pass ,
    //         })
    //       })
    //       .then((res)=>res.json())
    //       .then((res2)  =>{
    //           console.log(res2)
    //           if (res2 !== null && !res2.Error  ){
    //             swal("SucessFully Login"  )
    //             localStorage.setItem("Admin" , JSON.stringify("Yes") )
    //                 this.props.history.push("/admin")
    //           }
    //           else{
    //             swal("Email & Password are Incorrect Plz Try Again !"  )
    //           }
    //         // console.log(res2)
    //       })
    //       .catch((err)=>console.log(err))

    // }











     postData1 = (e) =>{
        e.preventDefault()
        if(this.state.email.length === 0){
            if (this.state.email === "projectpharma874@gmail.com")
            swal("Enter The Correct Email !" )
               return
            }

          fetch("/logIn-send-code",{
            method: 'POST' , 
            headers :  {
              "Content-Type" : "application/json" , 
            } , 
            body : JSON.stringify({
              email :this.state.email ,
            //   pass :this.state.pass ,
            })
          })
          .then((res)=>res.json())
          .then((res2)  =>{
            //   console.log(res2)

              if (res2.Ma){
                  this.setState({dis1 : true , Code1 : res2.Ma})
            //     swal("SucessFully Login"  )
            //     localStorage.setItem("Admin" , JSON.stringify("Yes") )
            //         this.props.history.push("/admin")
              }
              else{
                swal("Email & Password are Incorrect Plz Try Again !"  )
              }
            // console.log(res2)
          })
          .catch((err)=>console.log(err))

    }


     postData2 = (e) =>{
        e.preventDefault()
        // console.log(this.state.code== this.state.Code1);
        if(this.state.code != this.state.Code1){
            swal("Enter The Correct Code !" )
            }
            else{
                this.setState({dis2 : true ,dis1: false})

            }

    }



    postData3 = (e) =>{
        e.preventDefault()
        if(this.state.pass.length !== 0){
          fetch("/logIn-new-pass",{
            method: 'POST' , 
            headers :  {
              "Content-Type" : "application/json" , 
            } , 
            body : JSON.stringify({
              pass :this.state.pass ,
            //   pass :this.state.pass ,
            })
          })
          .then((res)=>res.json())
          .then((res2)  =>{
              console.log(res2)

              if (res2){
                //   this.setState({dis1 : true , Code1 : res2.Ma})
                swal("SucessFully Updated"  )
            //     localStorage.setItem("Admin" , JSON.stringify("Yes") )
                    this.props.history.push("/login-admin")
              }
              else{
                swal("Email & Password are Incorrect Plz Try Again !"  )
              }
            // console.log(res2)
          })
          .catch((err)=>console.log(err))

    }
    }







    render() {
 

        return (
            <div>
                   <div className="container" style={{width : "40%" , margin : "50px auto"}}>
                   {!this.state.dis1 ?

                <form  onSubmit={(e)=>this.postData1(e)}>
                    <h3>Forget Password</h3>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email"  value={this.state.email} onChange={(e)=>this.setState({email:e.target.value})}  className="form-control" placeholder="Enter email" />
                    </div>

                    {/* <div className="form-group">
                        <label>New Password</label>
                        <input type="password"   value={this.state.pass} onChange={(e)=>this.setState({pass:e.target.value})}  className="form-control" placeholder="Enter password" />
                    </div> */}
                <br/>

                    <button type="submit" className="btn btn-primary btn-block">Send</button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </form>
                : ""
                   }
                <br/>
                {this.state.dis1 ?
                     <form  onSubmit={(e)=>this.postData2(e)}>
                    <h3>Code Send </h3>

                    <div className="form-group">
                        <label>Check Email Enter Code</label>
                        <input type="number"  value={this.state.code} onChange={(e)=>this.setState({code:e.target.value})}  className="form-control" placeholder="Enter COde" />
                    </div>

                    {/* <div className="form-group">
                        <label>New Password</label>
                        <input type="password"   value={this.state.pass} onChange={(e)=>this.setState({pass:e.target.value})}  className="form-control" placeholder="Enter password" />
                    </div> */}
                <br/>

                    <button type="submit" className="btn btn-primary btn-block">Send</button>
                    {/* <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p> */}
                </form>
                : ""
                }
               
                    <br/>
                    {this.state.dis2 ?
                       <form  onSubmit={(e)=>this.postData3(e)}>
                    <h3>New Password</h3>
                    <div className="form-group">
                        <label>New Password</label>
                        <input type="password"   value={this.state.pass} onChange={(e)=>this.setState({pass:e.target.value})}  className="form-control" placeholder="Enter password" />
                    </div>
                <br/>

                    <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>  
                :""
                    }
               
            </div>
            </div>
        )
    }
}
