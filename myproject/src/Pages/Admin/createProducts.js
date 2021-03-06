import React, {Component} from 'react';
import swal from 'sweetalert';
// import { Link } from 'react-router-dom';

export default class createProduct extends Component {
    state ={
        Product_Name : "",
        Product_Title : "",
        Product_Price: "" ,
        Product_Catagories: "",
        Product_Image_Upload : "",
        doctor_prescription : "",
        Product_Short_Notes : "",
        Product_Long_Notes : "",
        Product_Popular : "",
        url : ""
    }
 SubmitDataMessage = (e) =>{
            e.preventDefault()
            console.log("wddde");
            // console.log(fname,Lname ,CName, Address 
            //     ,StateCountry  ,ZipPostal ,Email 
            //     ,Phone ,Order_Notes,Select_Country)
                const data = new FormData()
                data.append("file", this.state.Product_Image_Upload)
                data.append("upload_preset", "product")
                data.append("cloud_name", "freedeveloper")
                fetch("https://api.cloudinary.com/v1_1/freedeveloper/image/upload",{ 
                    method : "POST",
                    body : data , 
                })
                .then(res=>res.json())
                .then((res2)=>{
                    console.log(res2)
                    this.setState({url : res2.url})
                    // setUrl(res2.url)
                    if(res2.url !== ""){
                       
                        fetch("http://localhost:3000/AdminCreateProduct",{
                                    method: "POST",
                                    headers :  {
                                        "Content-Type" : "application/json" , 
                                    } ,
                                    body : JSON.stringify({
                                        Product_Name : this.state.Product_Name,
                                        Product_Title: this.state.Product_Title,
                                        Product_Price: this.state.Product_Price ,
                                        Product_Catagories: this.state.Product_Catagories ,
                                        Product_Image_Upload : res2.url,
                                        doctor_prescription : this.state.doctor_prescription,
                                        Product_Popular : this.state.Product_Popular,
                                        Product_Short_Notes : this.state.Product_Short_Notes,
                                        Product_Long_Notes : this.state.Product_Long_Notes,
                                    })
                                })
                                .then(res=>res.json())
                                .then((res2)=>{        
                                if(res2.Error){
                                    swal(res2.Error);
                                    // M.toast({html: res2.Error,classes:"#c62828 red darken-3"})
                                }
                                else{
                                    swal("Successfully Submit your Order!");
                                }
                            })
                            .catch(err=>{
                                swal("There is An Error")                  
                                }) 
                            }
                            else{
                                swal("Upload Again")                  
                            }
                        })
                        .catch(err=>swal("There is an Error"))
        
                    }   

    render() {

        // const [Product_Name , setProduct_Name] = useState("")
        // const [Product_Title , setProduct_Title] = useState("")
        // const [Product_Price , setProduct_Price] = useState("")
        // const [Product_Catagories , setProduct_Catagories] = useState("")
        // const [Product_Image_Upload , setProduct_Image_Upload] = useState("")
        // const [doctor_prescription , setDoctor_prescription] = useState("")
        // const [Product_Short_Notes , setProduct_Short_Notes] = useState("")
        // const [Product_Long_Notes , setProduct_Long_Notes] = useState("")
        // const [Product_Popular , setProduct_Popular] = useState("")
        // const [url , setUrl] = useState("")

        



        
        
        return (
            <div> 
                <center>
                    <h1>
                        <b>
                            Product Upload
                        </b>
                    </h1>
                </center>
            
                <div className="container">
                    <div className="row">
                        <form  onSubmit={(e)=>this.SubmitDataMessage(e)} className="col-xl-12 col-lg-12 col-md-12 col-sm-12 ">
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputEmail4">Product Name</label>
                                <input type="text"  value={this.state.Product_Name} onChange={(e)=>this.setState({Product_Name:e.target.value})}   className="form-control" id="inputEmail4" placeholder="Enter Product Name"/>
                                </div>
                                <div className="form-group col-md-6">
                                <label for="inputPassword4">Product Title</label>
                                <input type="text" value={this.state.Product_Title} onChange={(e)=>this.setState({Product_Title:e.target.value})}  className="form-control" id="inputPassword4" placeholder="Enter Product Title"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group  col-md-6">
                                    <label for="inputAddress">Product Price</label>
                                    <input type="Number" value={this.state.Product_Price} onChange={(e)=>this.setState({Product_Price:e.target.value})}  className="form-control" id="inputAddress" placeholder="Enter Product Price"/>
                                </div>
                                <div className="form-group  col-md-6">
                                    <label for="inputAddress">Product Catagories</label>
                                    <input type="text" value={this.state.Product_Catagories} onChange={(e)=>this.setState({Product_Catagories:e.target.value})}  className="form-control" id="inputAddress" placeholder="Enter Correct Catagories Name"/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group  col-md-6">
                                    <label for="inputAddress">Product Popular</label>
                                    <input type="text" value={this.state.Product_Popular} onChange={(e)=>this.setState({Product_Popular:e.target.value})}  className="form-control" id="inputAddress" placeholder="type ' yes ' otherwise 'no' "/>
                                </div>
                                {/* <div className="form-group  col-md-6">
                                    <label for="inputAddress">Product Catagories</label>
                                    <input type="text" className="form-control" id="inputAddress" placeholder="Enter Correct Catagories Name"/>
                                </div> */}
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="inputAddress2">Product Image Upload</label>
                                    <input type="file" onChange={(e)=>this.setState({Product_Image_Upload:e.target.files[0]})} className="form-control" id="inputAddress2" placeholder="Upload Image"/>
                                </div>
                                <div className="form-group  col-md-6">
                                        <label for="inputAddress">User Can attach the doctor prescription</label>
                                        <input type="text" value={this.state.doctor_prescription} onChange={(e)=>this.setState({doctor_prescription:e.target.value})}  className="form-control" id="inputAddress" placeholder="type ' yes ' otherwise 'no' "/>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputShort">Product Short Notes</label>
                                <textarea name="" type="text" value={this.state.Product_Short_Notes} onChange={(e)=>this.setState({Product_Short_Notes:e.target.value})} id="inputShort" className="form-control" cols="30" rows="5"></textarea>
                                </div>
                                <div className="form-group col-md-6">
                                <label for="inputLong">Product Long Description Notes</label>
                                <textarea name="" type="text"  value={this.state.Product_Long_Notes} onChange={(e)=>this.setState({Product_Long_Notes:e.target.value})}  id="inputLong" className="form-control" cols="30" rows="5"></textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
