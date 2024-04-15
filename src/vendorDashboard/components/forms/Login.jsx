import React,{useState} from 'react'
import { API_Path } from '../../data/apiPath'
function Login({setshowwelcomeHandler}) {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const loginHandler=async(e)=>{
        e.preventDefault();
        try{
            const response=await fetch(`${API_Path}/vendor/login`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            })
            const data = await response.json()
            if(response.ok){
                alert("Login Success")
                localStorage.setItem('loginToken',data.token)
                setemail("");
                setpassword("")
                setshowwelcomeHandler()
            }
            console.log("wecomne to chenenia",data.vendorId)
            const vendorId=data.vendorId
            const vendorResponse=await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`)
            const vendorData=await vendorResponse.json()
            if (vendorResponse.ok){
                const vendorFirmId=vendorData.vendorfirmId
                localStorage.setItem('firmId',vendorFirmId)
            }

            
        }catch(error){
            console.error(error);

        }
    }
  return (
    <div>
      <div className="loginSection">
        
        <form className="authForm" onSubmit={loginHandler}>
        <h3>Vendor Login</h3>
            <label>Email</label>
            <input type='text' name="email" value={email} onChange={(e)=>{
                setemail(e.target.value)
            }} placeholder='Enter Email here'></input><br></br>
            <label>Password</label>
            <input type='password' name="password" value={password} onChange={(e)=>{
                setpassword(e.target.value)
            }} placeholder='Enter Password here'></input><br></br>
            <div className="btnSubmit">
                <button>Submit</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
