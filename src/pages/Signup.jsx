import React, { useState } from "react"
import { Link } from "react-router-dom"
import { signUp } from "../utils/useSignup.js"
import { useNavigate } from "react-router-dom"

function Signup() {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [error, setError] = useState("")

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
        setError("");
        if (password !== cPassword) {
            setError("Passwords do not match");
            return;
        }
        signUp(email, password, username, navigate);
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSignup} className="flex flex-col items-center font-sans max-w-md p-8 bg-white rounded-lg shadow-md"> 
            <h2 className="text-2xl font-bold mb-8">Register</h2>
            {error && <p className="w-full text-red-500 mb-4 text-center">{error}</p>}
            <div className="w-full mb-4">
                <input 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200" 
                    type="email"
                    value={email} 
                    onChange={handleEmailChange} 
                    placeholder="Email"
                    required
                />
            </div>
            <div className="w-full mb-4">
                <input 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    value={username} 
                    onChange={handleUsernameChange} 
                    placeholder="Username"
                    required
                />
            </div>
            <div className="w-full mb-4">
                <input 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    type="password"
                    value={password} 
                    onChange={handlePasswordChange} 
                    placeholder="Password"
                    required
                />
            </div>
            <div className="w-full mb-6">
                <input 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    type="password"
                    value={cPassword} 
                    onChange={handleCPasswordChange} 
                    placeholder="Confirm Password"
                    required
                />
            </div>
            <button 
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200 font-semibold"
            >
                Sign up
            </button>
            <p className="mt-4 text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-cyan-500 hover:text-cyan-600 font-medium transition duration-200">
                    Login
                </Link>
            </p>
        </form>
    </div>
    );
}

export default Signup