import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signIn } from "../utils/useSignin"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        
        const result = await signIn(email, password);
        if (result.success) {
            navigate("/"); // Redirect to home page after successful login
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col items-center font-sans max-w-md p-8 bg-white rounded-lg shadow-md"> 
                <h2 className="text-2xl font-bold mb-8">Login</h2>
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
                <div className="w-full mb-6">
                    <input 
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="Password"
                        required
                    />
                </div>
                <button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition duration-200 font-semibold"
                    type="submit"
                >
                    Login
                </button>
                <p className="mt-4 text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link to="/signup" className="text-cyan-500 hover:text-cyan-600 font-medium transition duration-200">
                        Sign up
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default Login