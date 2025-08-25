import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'react-toastify';
import Header from '../Header/Header';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
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

  if (!user) {
    return (
      <>
        <Header />
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
          <p className="text-gray-600 font-medium">Please log in to view your profile.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
            Your Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* View Mode */}
        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500">Full Name</h3>
              <p className="mt-1 text-gray-800 font-semibold">{user.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="mt-1 text-gray-800 font-semibold">{user.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500">Phone</h3>
              <p className="mt-1 text-gray-800 font-semibold">{user.phone || 'Not provided'}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="text-sm text-gray-500">Address</h3>
              <p className="mt-1 text-gray-800 font-semibold">{user.address || 'Not provided'}</p>
            </div>
          </div>
        )}

        {/* Edit Mode */}
        {isEditing && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                value={user.email}
                disabled
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-orange-600 hover:to-pink-600 transition shadow-md"
            >
              Save Changes
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Profile;
