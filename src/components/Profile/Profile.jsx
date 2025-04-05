import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Header from '../Header/Header';
import api from '../../services/api';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                phone: user.phone || '',
                address: user.address || ''
            });
            setIsLoading(false);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await updateUserProfile({
            name: formData.name,
            phone: formData.phone,
            address: formData.address
        });
        
        if (result.success) {
            toast.success('Profile updated successfully');
            setIsEditing(false);
        } else {
            toast.error(result.error || 'Failed to update profile');
        }
    };

    if (isLoading) {
        return (
            <>
            <Header />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg">
                <div className="animate-pulse space-y-6">
                    <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                    </div>
                </div>
            </div>
            </>
        );
    }

    if (!user) {
        return (
            <>
            <Header />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg">
                <p className="text-center text-gray-600 font-medium">Please log in to view your profile.</p>
            </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                    Your Profile
                </h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="relative">
                <div className={`transition-all duration-500 ${isEditing ? 'opacity-0 h-0' : 'opacity-100'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                            <p className="mt-2 text-gray-800 font-semibold">{user.name}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                            <p className="mt-2 text-gray-800 font-semibold">{user.email}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                            <p className="mt-2 text-gray-800 font-semibold">{user.phone || 'Not provided'}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-sm font-medium text-gray-500">Address</h3>
                            <p className="mt-2 text-gray-800 font-semibold">{user.address || 'Not provided'}</p>
                        </div>
                    </div>
                </div>

                <div className={`absolute top-0 w-full transition-all duration-500 ${isEditing ? 'opacity-100' : 'opacity-0 h-0'}`}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-pink-600 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default Profile;