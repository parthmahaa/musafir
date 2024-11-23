import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.jsx';
import { FaRegHeart, } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import img1 from '../../assets/musafir-high-resolution-logo-transparent.png'

const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleLogout = () => {
      try {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        toast.success("Logged Out Successfully");
        navigate('/');
        setSidebarOpen(false);
      } catch (error) {
        toast.error("Logout failed. Please try again.");
      }
    };
  
    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    const closeSidebar = () => {
      setSidebarOpen(false);
    };
  
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
        <header className="shadow sticky z-50 top-0 bg-white">
          <nav className="px-4 lg:px-6 py-2.5">
            <div className="flex justify-between items-center mx-auto max-w-screen-xl">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <img src={img1} id="logo" className="max-w-21 max-h-6" alt="Logo" />
              </Link>
  
              {/* Mobile Icons */}
              <div className="flex items-center gap-4 lg:hidden">
                {isAuthenticated && (
                  <Link to="/wishlist" className="text-xl hover:text-red-500">
                    <FaRegHeart />
                  </Link>
                )}
                <button
                  onClick={toggleSidebar}
                  className="text-gray-700 hover:text-orange-700 text-xl"
                  aria-label="Toggle menu"
                >
                  <RiMenu3Fill />
                </button>
              </div>
  
              {/* Desktop Navigation - Centered */}
              <div className="hidden lg:flex lg:flex-1 lg:justify-center">
                <ul className="flex space-x-8">
                  <li>
                    <NavLink
                      to="/"
                      className={({isActive}) =>
                        `py-2 px-3 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/about"
                      className={({isActive}) =>
                        `py-2 px-3 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                      }
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/explore"
                      className={({isActive}) =>
                        `py-2 px-3 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                      }
                    >
                      Explore
                    </NavLink>
                  </li>
                </ul>
              </div>
  
              {/* Desktop Right Side */}
              <div className="hidden lg:flex lg:items-center lg:gap-4">
                {isAuthenticated && (
                  <Link to="/wishlist" className="text-xl hover:text-red-500">
                    <FaRegHeart />
                  </Link>
                )}
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className="text-gray-800 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Log in
                  </Link>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="text-gray-800 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Log Out
                  </button>
                )}
                <Link
                  to="/contact-us"
                  className="text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Subscribe
                </Link>
              </div>
  
              {/* Mobile Sidebar */}
              <div
                className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                  isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
              >
                <div className="flex flex-col h-full">
                  {/* Close Button */}
                  <button
                    onClick={closeSidebar}
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                  >
                    <IoMdClose className="w-6 h-6" />
                  </button>
  
                  {/* Top Navigation Links */}
                  <div className="p-4 mt-8">
                    <NavLink
                      to="/"
                      onClick={closeSidebar}
                      className={({isActive}) =>
                        `block py-2 px-3 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                      }
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/about"
                      onClick={closeSidebar}
                      className={({isActive}) =>
                        `block py-2 px-3 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                      }
                    >
                      About
                    </NavLink>
                    <NavLink
                      to="/explore"
                      onClick={closeSidebar}
                      className={({isActive}) =>
                        `block py-2 px-3 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                      }
                    >
                      Explore
                    </NavLink>
                  </div>
  
                  {/* Bottom Authentication and Subscribe */}
                  <div className="mt-auto p-4 border-t">
                    {!isAuthenticated ? (
                      <Link
                        to="/login"
                        onClick={closeSidebar}
                        className="block w-full text-gray-800 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2 mb-3 text-center"
                      >
                        Log in
                      </Link>
                    ) : (
                      <button
                        onClick={handleLogout}
                        className="block w-full text-gray-800 hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2 mb-3 text-center"
                      >
                        Log Out
                      </button>
                    )}
                    <Link
                      to="/contact-us"
                      onClick={closeSidebar}
                      className="block w-full text-white bg-orange-700 hover:bg-orange-800 font-medium rounded-lg text-sm px-4 py-2 text-center"
                    >
                      Subscribe
                    </Link>
                  </div>
                </div>
              </div>
  
              {/* Overlay */}
              {isSidebarOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                  onClick={closeSidebar}
                />
              )}
            </div>
          </nav>
        </header>
      </>
    );
  };

export default Header;