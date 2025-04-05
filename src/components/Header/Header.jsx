import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Context/AuthContext";
import { FaRegHeart, FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import AnnouncementBadge from './AnnouncementBadge';
import img1 from '../../assets/musafir-high-resolution-logo-transparent.png';

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setIsAdmin, isAdmin } =
    useContext(AuthContext);
  const [mounted, setMounted] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileDropdown && !event.target.closest('.profile-dropdown')) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileDropdown]);
  
  useEffect(() => {
    // Ensure component is mounted before performing any operations
    setMounted(true);

    // Check token on mount to sync authentication state
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      setIsAuthenticated(true);
    }
    return () => {
      setMounted(false);
    };
  }, [isAuthenticated, setIsAuthenticated, localStorage.getItem('token')]);

  const handleLogout = () => {
    // Only proceed if component is mounted
    if (!mounted) return;

    try {
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsMobileSidebarOpen(false);
      navigate('/');
      toast.success('Logged Out');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <ToastContainer />
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={img1} id="logo" className="max-w-21 max-h-6" alt="Logo" />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center">
            <ul className="flex flex-row space-x-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/explore"
                  className={({ isActive }) =>
                    `block py-2 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700`
                  }
                >
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plan-your-trip"
                  className={({ isActive }) =>
                    `block py-2 duration-200 ${
                      isActive ? 'text-orange-700' : 'text-gray-700'
                    } hover:text-orange-700`
                  }
                >
                  Trips
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop Right Side - Wishlist, Login and Subscribe */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="text-lg hover:text-red-500">
                  <FaRegHeart />
                </Link>
                <AnnouncementBadge />  
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center text-lg hover:text-orange-700"
                  >
                    <FaUserCircle />
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        View Profile
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowProfileDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                >
                  Log in
                </Link>
                <Link
                  to="/contact-us"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                >
                  Subscribe
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Container */}
          <div className="lg:hidden flex items-center">
            {isAuthenticated && (
              <Link to="/wishlist" className="mr-4 text-xl hover:text-red-500">
                <FaRegHeart />
              </Link>
            )}
            <button
              onClick={toggleMobileSidebar}
              className="text-gray-800 hover:text-orange-700 focus:outline-none"
            >
              {isMobileSidebarOpen ? (
                <FaTimes size={24} />
              ) : (
                <FaBars size={24} />
              )}
            </button>
          </div>

          {/* Mobile Sidebar */}
          {isMobileSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={closeMobileSidebar}
            ></div>
          )}
          <div
            className={`
                        fixed top-0 right-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out z-50
                        flex flex-col
                        ${
                          isMobileSidebarOpen
                            ? 'translate-x-0'
                            : 'translate-x-full'
                        }
                    `}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Menu</h2>
              <button
                onClick={closeMobileSidebar}
                className="text-gray-600 hover:text-orange-700"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="flex-grow">
              <ul className="p-4">
                <li className="mb-3">
                  <NavLink
                    to="/"
                    onClick={closeMobileSidebar}
                    className={({ isActive }) =>
                      `block py-2 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } hover:text-orange-700`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li className="mb-4">
                  <NavLink
                    to="/about"
                    onClick={closeMobileSidebar}
                    className={({ isActive }) =>
                      `block py-2 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } hover:text-orange-700`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/explore"
                    onClick={closeMobileSidebar}
                    className={({ isActive }) =>
                      `block py-2 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } hover:text-orange-700`
                    }
                  >
                    Explore
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/plan-your-trip"
                    onClick={closeMobileSidebar}
                    className={({ isActive }) =>
                      `block pt-4 duration-200 ${
                        isActive ? 'text-orange-700' : 'text-gray-700'
                      } hover:text-orange-700`
                    }
                  >
                    Trips
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="p-4 border-t">
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  onClick={closeMobileSidebar}
                  className="block w-full text-gray-800 hover:bg-gray-200 rounded-lg text-sm px-4 py-2 text-center mb-4"
                >
                  Log in
                </Link>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();
                    closeMobileSidebar();
                  }}
                  className="w-full text-gray-800 hover:bg-gray-200 rounded-lg text-sm px-4 py-2 text-center mb-4"
                >
                  Log Out
                </button>
              )}
              <Link
                to="/contact-us"
                onClick={closeMobileSidebar}
                className="block w-full text-white bg-orange-700 hover:bg-orange-800 rounded-lg text-sm px-4 py-2 text-center"
              >
                Subscribe
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

