import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaMapMarkerAlt, FaEnvelope, FaPhone, FaSignOutAlt, FaCamera } from "react-icons/fa";
const ProfilePage = () => {
  const [profilePic, setProfilePic] = useState("pp.jpg");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-96 text-center transition-transform transform hover:scale-105">
        <div className="relative w-32 h-32 mx-auto">
          <img
            src={'pp.jpg'}
            className="w-32 h-32 rounded-full mx-auto shadow-lg border-4 "
          />
          <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700 transition cursor-pointer">
            <FaCamera size={16} />
            <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>
        <h1 className="text-2xl font-bold mt-4 text-gray-900">Mohammad Shiraz</h1>
        
        <div className="mt-4 text-left space-y-2 text-gray-700">
          <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> I live in the moment. You should try it sometime.</p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-red-500" /> leave.me.alone@bye.com</p>
          <p className="flex items-center gap-2"><FaPhone className="text-green-500" /> 0800-MYOB (Mind Your Own Business)</p>
        </div>
        
        <div className="flex justify-center gap-6 mt-6">
          <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors duration-300">
            <FaShoppingCart size={26} />
          </a>
          <a href="#" className="text-red-500 hover:text-red-700 transition-colors duration-300">
            <FaHeart size={26} />
          </a>
        </div>
        
        <button className="mt-6 bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-700 w-full font-semibold shadow-md transition-transform transform hover:scale-105">
          View Orders
        </button>
        <button className="mt-3 bg-blue-500 text-white px-5 py-3 rounded-lg hover:bg-blue-700 w-full font-semibold shadow-md transition-transform transform hover:scale-105">
          Edit Profile
        </button>
        <button className="mt-3 bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-700 w-full font-semibold shadow-md flex items-center justify-center gap-2 transition-transform transform hover:scale-105">
          <FaSignOutAlt /> Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
