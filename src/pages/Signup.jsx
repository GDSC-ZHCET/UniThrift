import React, { useState } from "react"
import { Link } from "react-router-dom"
import { signUp } from "../utils/useSignup.js"
import { useNavigate } from "react-router-dom"

function Signup() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    

    const navigate  = useNavigate(); 

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    function handleCPasswordChange(event) {
        setCPassword(event.target.value);
    }

    const handleSignup = async (event) => {
        event.preventDefault();
        if (password !== cPassword) {
            alert("Passwords do not match");
            return;
        }
        signUp(email, password, username, navigate);
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="flex flex-col items-center font-sans max-w-md p-8"> 
                <h2 className="text-2xl font-bold mb-8">Register</h2>
                <div className="w-full mb-4">
                    <input 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="email"
                        value={email} 
                        onChange={handleEmailChange} 
                        placeholder="Email"
                    />
                </div>
                <div className="w-full mb-4">
                    <input 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        value={username} 
                        onChange={handleUsernameChange} 
                        placeholder="Username"
                    />
                </div>
                <div className="w-full mb-4">
                    <input 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="password"
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="Password"
                    />
                </div>
                <div className="w-full mb-6">
                    <input 
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        type="password"
                        value={cPassword} 
                        onChange={handleCPasswordChange} 
                        placeholder="Confirm Password"
                    />
                </div>
                <button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition duration-200"
                    onClick={handleSignup}
                >
                    Sign up
                </button>
                <p className="mt-4 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-cyan-500 hover:text-cyan-600">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Signup