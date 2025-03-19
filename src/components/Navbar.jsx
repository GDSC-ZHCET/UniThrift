import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { signout } from "../utils/useSignout";
import logo from "../assets/logo.png";
import { Popover, Transition } from '@headlessui/react';
import { 
  AcademicCapIcon, 
  MenuIcon, 
  XIcon, 
  SearchIcon, 
  ShoppingCartIcon, 
  UserCircleIcon,
  ExternalLinkIcon
} from '@heroicons/react/outline';
import React, { Fragment } from 'react';



const Navbar = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  // Define navigation items
  const navigation = [
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '#categories' },
    { name: 'How It Works', href: '#how-it-works' },
  ];
  const handleSignOut = async () => {
    await signout();
    navigate("/login");
  };

  return (
    <Popover as="header" className="relative z-10">
              <div className="bg-[#111828] py-6">
                <nav
                  className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full md:w-auto">
                      <Link to="/">
                        <span className="sr-only">UniThrift</span>
                        <div className="flex items-center">
                          <AcademicCapIcon className="h-8 w-8 text-white" />
                          <span className="ml-2 text-xl font-bold text-white">UniThrift</span>
                        </div>
                      </Link>
                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-green-600 rounded-md p-2 inline-flex items-center justify-center text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="hidden space-x-8 md:flex md:ml-10">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-white hover:text-gray-100"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:space-x-6">
                    {currentUser ? (
                      <>
                        <Link to="/cart" className="text-base font-medium text-white hover:text-gray-100">
                          <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                        <Link to="/profile" className="text-base font-medium text-white hover:text-gray-100">
                          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
                        </Link>
                        <Link
                          to="/upload"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
                        >
                          Sell an Item
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/login" className="text-base font-medium text-white hover:text-gray-100">
                          Log in
                        </Link>
                        <Link
                          to="/signup"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
                        >
                          Sign up
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </div>
    
              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden">
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <AcademicCapIcon className="h-8 w-8 text-green-600" />
                        <span className="ml-2 text-xl font-bold text-gray-900">UniThrift</span>
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="pt-5 pb-6">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 px-5">
                        {currentUser ? (
                          <>
                            <Link
                              to="/upload"
                              className="block text-center w-full py-3 px-4 rounded-md shadow bg-green-600 text-white font-medium hover:bg-green-700"
                            >
                              Sell an Item
                            </Link>
                            <div className="mt-4 flex justify-around">
                              <Link to="/cart" className="text-center py-2 text-base font-medium text-gray-500 hover:text-gray-900">
                                <ShoppingCartIcon className="h-6 w-6 mx-auto" />
                                <span className="text-sm">Cart</span>
                              </Link>
                              <Link to="/profile" className="text-center py-2 text-base font-medium text-gray-500 hover:text-gray-900">
                                <UserCircleIcon className="h-6 w-6 mx-auto" />
                                <span className="text-sm">Profile</span>
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            <Link
                              to="/signup"
                              className="block text-center w-full py-3 px-4 rounded-md shadow bg-green-600 text-white font-medium hover:bg-green-700"
                            >
                              Sign up
                            </Link>
                            <p className="mt-4 text-center text-base font-medium text-gray-500">
                              Already have an account?{' '}
                              <Link to="/login" className="text-green-600 hover:text-green-500">
                                Log in
                              </Link>
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
  );
};

export default Navbar;
