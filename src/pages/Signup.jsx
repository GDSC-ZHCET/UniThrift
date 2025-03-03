
import "../pages/Signup.css"
import React,{useState} from "react"
import { use } from "react"
import { Link } from 'react-router-dom';
function Signup (){
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [cPassword,setCPassword] = useState("")
    
    
    function handleEmailChange (event){
        setEmail(event.target.value);
    }
    function handleUsernameChange (event){
        setUsername(event.target.value);
    }
    function handlePasswordChange (event){
        setPassword(event.target.value);
    }
    function handleCPasswordChange (event){
        setCPassword(event.target.value);
    }
    
    return(
    <>
       
    <form className="form-elements"> 
    <h2 className="heading" >Register</h2>
         <div>
         <input className= "input-text" value={email} onChange={handleEmailChange} placeholder="Email"/>
         </div>
         <div>
         <input className= "input-text" value={username} onChange={handleUsernameChange} placeholder="Username"/>
         </div>
         <div>
         <input className= "input-text" value={password} onChange={handlePasswordChange} placeholder="Password"/>
         </div>
         <div>
         <input className= "input-text" value={cPassword} onChange={handleCPasswordChange} placeholder="Confirm Password"/>
         </div>
         <div>
         <button className="Signup-button">Sign up</button>
         </div>
    <p>Already have an account?
    <div><Link to="/login" className="link">Login-0p</Link></div></p>
    </form>

</>

    );




}

export default Signup