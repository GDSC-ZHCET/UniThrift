import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../utils/useSignin";
import { FiMail, FiLock } from "react-icons/fi";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back</h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Sign in to your UniThrift account to continue buying and selling
                    </p>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-red-700">{error}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>
                        
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </label>
                                
                            </div>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    className="py-2 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 font-medium cursor-pointer"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-green-500 hover:text-green-600 font-medium transition duration-200">
                        Sign up
                    </Link>
                </p>
                
                
            </div>
        </div>
    );
}

export default Login;