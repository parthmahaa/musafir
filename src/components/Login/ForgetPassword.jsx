import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import img1 from '../../assets/logo.png';
import api from '../../services/api';

const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/forgot-password', { email });
            if (response.data.success) {
                setOtpSent(true);
                toast.success('OTP sent to your email!');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to send OTP');
        }
        setLoading(false);
    };

    const handleResendOTP = async () => {
        setLoading(true);
        try {
            const response = await api.post('/auth/forgot-password', { email });
            if (response.data.success) {
                toast.success('OTP resent to your email!');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to resend OTP');
        }
        setLoading(false);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.post('/auth/reset-password', {
                email,
                otp,
                newPassword
            });
            if (response.data.success) {
                setTimeout(() => {
                    toast.success('Password reset successful!');
                }, 100);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.error || 'Failed to reset password');
        }
        setLoading(false);
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        <Link to="/">
                            <div className="h-15 w-50 mb-6 pb-5 md:mb-0">
                                <Link to="/" className="flex items-center">
                                    <img src={img1} id="logo" className="max-w-23 filter-none max-h-6" alt="" />
                                </Link>
                            </div>
                        </Link>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Forgot Password
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 transition-all duration-200 hover:underline">
                            Sign in
                        </Link>
                    </p>

                    {!otpSent ? (
                        <form className="mt-8" onSubmit={handleSendOTP}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                                            placeholder="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="pt-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white transition-all duration-200 hover:bg-black/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center">
                                                Send OTP
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="16"
                                                    height="16"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="ml-2"
                                                >
                                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <form className="mt-8" onSubmit={handleResetPassword}>
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="otp" className="text-base font-medium text-gray-900">
                                        Enter OTP
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="otp"
                                            required
                                            className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="text-base font-medium text-gray-900">
                                        New Password
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            id="newPassword"
                                            required
                                            className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                                            placeholder="New Password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="pt-3 space-y-3">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white transition-all duration-200 hover:bg-black/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            </div>
                                        ) : (
                                            'Reset Password'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleResendOTP}
                                        disabled={loading}
                                        className="inline-flex w-full items-center justify-center rounded-md bg-gray-600 px-3.5 py-2.5 font-semibold leading-7 text-white transition-all duration-200 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Resending...' : 'Resend OTP'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ForgetPassword;
