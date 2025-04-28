import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../../assets/logo.png';
import { FaLinkedin, FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
            <div className="mx-auto w-full max-w-screen-xl px-4 py-8 lg:py-12">
                <div className="md:flex md:justify-between md:items-start">
                    {/* Logo Section */}
                    <div className="mb-8 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img
                                src={img1}
                                id="logo"
                                className="max-h-8 w-auto transition-transform duration-300 hover:scale-105"
                                alt="Logo"
                            />
                        </Link>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
                        {/* Resources */}
                        <div>
                            <h2 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Resources
                            </h2>
                            <ul className="text-gray-600 font-medium space-y-3">
                                <li>
                                    <Link
                                        to="/"
                                        className="hover:text-orange-600 transition-colors duration-200"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/about"
                                        className="hover:text-orange-600 transition-colors duration-200"
                                    >
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Follow Us */}
                        <div>
                            <h2 className="mb-4 text-sm font-bold text-gray-900 uppercase tracking-wide">
                                Follow Us
                            </h2>
                            <ul className="text-gray-600 font-medium space-y-3">
                                <li>
                                    <a
                                        href="https://github.com/parthmahaa"
                                        className="hover:text-orange-600 transition-colors duration-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/parth-maha-8a3079200/"
                                        className="hover:text-orange-600 transition-colors duration-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="my-8 border-gray-200" />

                {/* Bottom Section */}
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-600 sm:text-center">
                        ©{' '}
                        <a
                            href="https://parthmaha.vercel.app/"
                            className="hover:text-orange-600 transition-colors duration-200"
                        >
                            {new Date().getFullYear()} Musafir
                        </a>
                        . All Rights Reserved.
                    </span>

                    {/* Social Icons */}
                    <div className="flex mt-6 space-x-6 sm:mt-0 sm:justify-center">
                        <a
                            href="https://www.linkedin.com/in/parth-maha-8a3079200/"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
                            title="LinkedIn"
                        >
                            <FaLinkedin className="w-5 h-5" />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a
                            href="https://x.com/ParthMaha"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
                            title="Twitter"
                        >
                            <FaTwitter className="w-5 h-5" />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a
                            href="https://github.com/parthmahaa"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
                            title="GitHub"
                        >
                            <FaGithub className="w-5 h-5" />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a
                            href="https://www.instagram.com/parthmaha"
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-600 hover:text-orange-600 transition-all duration-300 transform hover:scale-110"
                            title="Instagram"
                        >
                            <FaInstagram className="w-5 h-5" />
                            <span className="sr-only">Instagram</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}