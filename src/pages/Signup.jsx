import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../utils/useSignup.js";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiPhone, FiBook, FiCheck } from "react-icons/fi";

function Signup() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        phone: "",
        university: "",
        password: "",
        cPassword: ""
    });
    
    const [error, setError] = useState("");
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateStep1 = () => {
        if (!formData.firstName.trim()) {
            setError("First name is required");
            return false;
        }
        if (!formData.lastName.trim()) {
            setError("Last name is required");
            return false;
        }
        if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
            setError("Valid email is required");
            return false;
        }
        if (!formData.username.trim()) {
            setError("Username is required");
            return false;
        }
        setError("");
        return true;
    };

    const goToNextStep = () => {
        if (validateStep1()) {
            setStep(2);
        }
    };

    const goToPreviousStep = () => {
        setStep(1);
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        setError("");
        
        if (formData.password !== formData.cPassword) {
            setError("Passwords do not match");
            return;
        }
        
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        
        // Pass all form data to signUp function
        signUp(
            formData.email,
            formData.password,
            formData.username,
            navigate,
            {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                university: formData.university
            }
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Join UniThrift</h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Create an account to start buying and selling within your university community
                    </p>
                </div>
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Progress steps */}
                    <div className="bg-gray-50 px-4 py-3 border-b">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 1 ? 'bg-green-500 text-white' : 'bg-green-100 text-green-500'}`}>
                                    {step > 1 ? <FiCheck className="w-5 h-5" /> : "1"}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-900">Personal Info</span>
                            </div>
                            <div className="h-0.5 flex-1 mx-4 bg-gray-200">
                                <div className={`h-0.5 bg-green-500 ${step === 1 ? 'w-0' : 'w-full'} transition-width duration-300`}></div>
                            </div>
                            <div className="flex items-center">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${step === 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                                    {step > 2 ? <FiCheck className="w-5 h-5" /> : "2"}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-900">Account Setup</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Form */}
                    <form onSubmit={handleSignup} className="p-6 space-y-6">
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
                        
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                            First Name
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiUser className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="firstName"
                                                id="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                                placeholder="John"
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Last Name
                                        </label>
                                        <div className="relative rounded-md shadow-sm">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FiUser className="text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="lastName"
                                                id="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                                placeholder="Doe"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                
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
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                                        Username
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                                            placeholder="johndoe"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        onClick={goToNextStep}
                                        className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 font-medium cursor-pointer"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                        
                        {step === 2 && (
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiPhone className="text-gray-400" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="phone"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="py-2 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="(123) 456-7890"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                                        University
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiBook className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="university"
                                            id="university"
                                            value={formData.university}
                                            onChange={handleChange}
                                            className="py-2 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="Your University"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="py-2 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Minimum 6 characters
                                    </p>
                                </div>
                                
                                <div>
                                    <label htmlFor="cPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <div className="relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FiLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="cPassword"
                                            id="cPassword"
                                            value={formData.cPassword}
                                            onChange={handleChange}
                                            className="py-2 focus:ring-green-500 focus:border-green-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>
                                </div>
                                
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={goToPreviousStep}
                                        className="mt-4 w-1/2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-50 transition duration-200 font-medium cursor-pointer"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="mt-4 w-1/2 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-200 font-medium cursor-pointer"
                                    >
                                        Create Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
                
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-500 hover:text-green-600 font-medium transition duration-200">
                        Sign in
                    </Link>
                </p>
                
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-500">
                        By signing up, you agree to our{' '}
                        <a href="#" className="underline hover:text-gray-700">Terms of Service</a>{' '}
                        and{' '}
                        <a href="#" className="underline hover:text-gray-700">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;