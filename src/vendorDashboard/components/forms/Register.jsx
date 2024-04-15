import React,{useState} from 'react'
import { API_Path } from '../../data/apiPath'
function Register({showLoginHandler}) {
    const [username,setUsername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState("")
    const [loading,setLoading]=useState(true)
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const response=await fetch(`${API_Path}/vendor/register`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({username,email,password})
            })
            const data =await response.json()
            if (response.ok){
                console.log(data)
                alert("Vender Register Success")
            }
            setUsername("");
            setemail("");
            setpassword("")
            showLoginHandler()
        }catch(error){
            console.log("Registration failed",error)
            alert("Vender Register Failed")
        }

    }
  return (

      <div className="registerSection">
        
        <form className="authForm" onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>Username</label>
            <input type='text' name="username" value={username} onChange={(e)=>{
                setUsername(e.target.value)
            }} placeholder='Enter Username here'></input><br></br>
            <label>Email</label>
            <input type='text' name="email" value={email} onChange={(e)=>{
                setemail(e.target.value)
            }} placeholder='Enter Email here'></input><br></br>
            <label>Password</label>
            <input type='password' name="password" value={password} onChange={(e)=>{
                setpassword(e.target.value)
            }} placeholder='Enter Password here'></input><br></br>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
      </div>

  )
}

export default Register
