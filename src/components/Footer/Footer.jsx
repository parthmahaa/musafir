import React from 'react'
import { Link } from 'react-router-dom';
import img1 from '../../assets/logo.png'
import { FaLinkedin , FaTwitter, FaGithub, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-white border-y">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <img src={img1} id="logo" className="max-w-23 filter-none max-h-6" alt="Logo" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link to="/" className="hover:underline">Home</Link>
                                </li>
                                <li>
                                    <Link to="/about" className="hover:underline">About</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/parthmahaa"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/parth-maha-8a3079200/"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Details</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link to="https://parthmaha.vercel.app/" target='_blank' className="hover:underline">Parth Maha</Link>
                                </li>
                                <li>
                                    <Link to="#" className="hover:underline">Surat, Gujarat</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        ©  
                        <a href="" className="hover:underline">Parth Maha</a>
                        . All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <a href="https://www.linkedin.com/in/parth-maha-8a3079200/" target='_blank' className="text-gray-500 hover:text-gray-900">
                            <FaLinkedin  className="w-4 h-4" />
                            <span className="sr-only">Facebook page</span>
                        </a>
                        <a href="https://x.com/ParthMaha" target='_blank' className="text-gray-500 hover:text-gray-900">
                            <FaTwitter className="w-4 h-4" />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="https://github.com/parthmahaa" target='_blank' className="text-gray-500 hover:text-gray-900">
                            <FaGithub className="w-4 h-4" />
                            <span className="sr-only">GitHub account</span>
                        </a>
                        <a href="https://www.instagram.com/parthmaha" target='_blank' className="text-gray-500 hover:text-gray-900">
                            <FaInstagram className="w-4 h-4" />
                            <span className="sr-only">Instagram page</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}