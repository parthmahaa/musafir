import React , {useState} from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext.jsx'
import img1 from '../../assets/musafir-high-resolution-logo-transparent.png'
import { useContext , useEffect} from 'react';
import { FaRegHeart } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';

export default function Header() {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        toast.success("Logged Out");
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img src={img1} id="logo" className="max-w-21 max-h-6" alt="Logo" />
                    </Link>

                    {/* Mobile Right Icons */}
                    <div className="flex items-center gap-4 lg:hidden">
                        {isAuthenticated && (
                            <Link to="/wishlist" className="text-xl hover:text-red-500">
                                <FaRegHeart />
                            </Link>
                        )}
                        <button onClick={toggleSidebar} className="text-2xl">
                            {isSidebarOpen ? <IoMdClose /> : <RiMenu3Fill />}
                        </button>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center lg:order-2">
                        {isAuthenticated && (
                            <Link to="/wishlist" className="text-xl hover:text-red-500 mr-1">
                                <FaRegHeart className='text-l' />
                            </Link>
                        )}
                        <Link
                            hidden={isAuthenticated}
                            to="/login"
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            hidden={!isAuthenticated}
                            onClick={handleLogout}
                            className="text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log Out
                        </Link>
                        <Link
                            to="/contact-us"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Subscribe
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden lg:flex lg:w-auto lg:order-1">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/explore"
                                    className={({isActive}) =>
                                        `block py-2 pr-4 pl-3 duration-200 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 lg:p-0`
                                    }
                                >
                                    Explore
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Mobile Sidebar */}
                    <div className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
                        <div className="flex flex-col h-full">
                            <div className="flex justify-end p-4">
                                <button onClick={toggleSidebar} className="text-2xl">
                                    <IoMdClose />
                                </button>
                            </div>
                            <ul className="flex flex-col px-4 pt-4 space-y-4">
                                <li>
                                    <NavLink
                                        to="/"
                                        className={({isActive}) =>
                                            `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                        }
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/about"
                                        className={({isActive}) =>
                                            `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                        }
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        About
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/explore"
                                        className={({isActive}) =>
                                            `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                        }
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        Explore
                                    </NavLink>
                                </li>
                            </ul>
                            <div className="mt-auto p-4 space-y-4">
                                {!isAuthenticated && (
                                    <Link
                                        to="/login"
                                        className="block w-full text-center text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        Log in
                                    </Link>
                                )}
                                {isAuthenticated && (
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsSidebarOpen(false)
                                        }}
                                        className="block w-full text-center text-gray-800 hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                                    >
                                        Log Out
                                    </button>
                                )}
                                <Link
                                    to="/contact-us"
                                    className="block w-full text-center text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 focus:outline-none"
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    Subscribe
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </header>
    );
}