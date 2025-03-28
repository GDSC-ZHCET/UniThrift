import React, { useState, useContext, useEffect } from "react";
import { FaHeart, FaMapMarkerAlt, FaEnvelope, FaPhone, FaSignOutAlt, FaEdit, FaBox } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProfilePage = () => {
  const { currentUser, loading } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [listings, setListings] = useState([]);
  const [isLoadingListings, setIsLoadingListings] = useState(false);
  const navigate = useNavigate();
  
  // Set initial values when user data is loaded
  useEffect(() => {
    if (currentUser) {
      // Fetch user orders
      fetchOrders();
      
      // Fetch user listings
      fetchListings();
    }
  }, [currentUser]);

  const fetchOrders = async () => {
    if (!currentUser) return;
    
    setIsLoadingOrders(true);
    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("buyer_id", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const ordersData = [];
      querySnapshot.forEach((doc) => {
        ordersData.push({ id: doc.id, ...doc.data() });
      });
      
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const fetchListings = async () => {
    if (!currentUser) return;
    
    setIsLoadingListings(true);
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("userId", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      const listingsData = [];
      querySnapshot.forEach((doc) => {
        listingsData.push({ id: doc.id, ...doc.data() });
      });
      
      setListings(listingsData);
    } catch (error) {
      console.error("Error fetching listings:", error);
    } finally {
      setIsLoadingListings(false);
    }
  };

  

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-700 mb-6">Please sign in to view your profile</p>
          <button 
            onClick={() => navigate("/login")}
            className="bg-green-500 text-white px-5 py-3 rounded-lg hover:bg-green-700 w-full font-semibold shadow-md"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Profile sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 h-24"></div>
              
              <div className="p-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">{currentUser.displayName || "UniThrift User"}</h2>
                <p className="text-gray-500 text-sm mt-1">{currentUser.email}</p>
                
                <div className="mt-6 flex flex-col space-y-2 text-left">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaEnvelope className="text-gray-400" /> <span className="text-sm">{currentUser.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaPhone className="text-gray-400" /> <span className="text-sm">{currentUser?.phone || "Not provided"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaMapMarkerAlt className="text-gray-400" /> <span className="text-sm">{currentUser?.university || "Not provided"}</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition cursor-pointer"
                  >
                    <FaSignOutAlt size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="lg:col-span-9">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Tab navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-1 ${
                      activeTab === 'profile' 
                        ? 'text-green-600 border-b-2 border-green-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaEdit className="w-4 h-4" /> Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-1 ${
                      activeTab === 'orders' 
                        ? 'text-green-600 border-b-2 border-green-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaBox className="w-4 h-4" /> My Orders
                  </button>
                  <button
                    onClick={() => setActiveTab('listings')}
                    className={`px-4 py-3 text-sm font-medium flex items-center gap-1 ${
                      activeTab === 'listings' 
                        ? 'text-green-600 border-b-2 border-green-500' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <FaHeart className="w-4 h-4" /> My Listings
                  </button>
                </nav>
              </div>
              
              {/* Tab content */}
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm text-gray-500">Update your personal details and preferences.</p>
                    
                    <form className="mt-6 space-y-6">
                      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First name</label>
                          <input
                            type="text"
                            id="first-name"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            defaultValue={currentUser?.firstName || ""}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last name</label>
                          <input
                            type="text"
                            id="last-name"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            defaultValue={currentUser?.lastName || ""}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                          <input
                            type="text"
                            id="phone"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            defaultValue={currentUser?.phone || ""}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="university" className="block text-sm font-medium text-gray-700">University</label>
                          <input
                            type="text"
                            id="university"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            defaultValue={currentUser?.university || ""}
                          />
                        </div>
                        
                        {/* <div className="sm:col-span-2">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                          <textarea
                            id="bio"
                            rows={4}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                            defaultValue={currentUser?.bio || ""}
                            placeholder="Tell us a bit about yourself..."
                          />
                        </div> */}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="ml-3 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">My Orders</h2>
                    <p className="mt-1 text-sm text-gray-500">Review your recent orders and their status.</p>
                    
                    {isLoadingOrders ? (
                      <div className="flex justify-center mt-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-12">
                        <FaBox className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Start shopping to place your first order.</p>
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Shop Now
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-6 overflow-hidden shadow-sm border border-gray-200 sm:rounded-md">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Order ID
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Total
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Items
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                              <tr key={order.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  #{order.id.slice(0, 8)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {formatDate(order.created_at)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  ₹{order.total_amount || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                    {order.seller_status || 'Processing'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {order.items?.length || 0} items
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'listings' && (
                  <div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-lg font-medium text-gray-900">My Listings</h2>
                        <p className="mt-1 text-sm text-gray-500">Manage your product listings.</p>
                      </div>
                      <button
                        onClick={() => navigate('/upload')}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        Add New Listing
                      </button>
                    </div>
                    
                    {isLoadingListings ? (
                      <div className="flex justify-center mt-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
                      </div>
                    ) : listings.length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No listings yet</h3>
                        <p className="mt-1 text-sm text-gray-500">Get started by creating a new listing.</p>
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => navigate('/upload')}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            Add Listing
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                        {listings.map((listing) => (
                          <div key={listing.id} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="aspect-w-3 aspect-h-2">
                              <img 
                                src={listing.imageUrl} 
                                alt={listing.title} 
                                className="w-full h-48 object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-medium text-gray-900 truncate">{listing.title}</h3>
                              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{listing.description}</p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">₹{listing.price}</span>
                                <span className="text-sm text-gray-500 capitalize">{listing.category}</span>
                              </div>
                              
                              <div className="mt-4 flex space-x-2">
                                <button className="flex-1 bg-gray-100 hover:bg-gray-200 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-gray-900">
                                  Edit
                                </button>
                                <button className="flex-1 bg-red-50 hover:bg-red-100 py-2 px-4 border border-transparent rounded-md text-sm font-medium text-red-600">
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;