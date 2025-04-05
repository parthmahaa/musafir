import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/contact-us', { name, email });
      if (response.data.success) {
        setTimeout(() => {
          toast.success(response.data.message || 'Subscribed successfully');
        }, 100);
        history('/');
      } else {
        toast.error(response.data.message || 'Email already exists');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to subscribe, try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col pt-20 items-center justify-center text-center min-h-100">
      <div className="flex flex-col justify-center items-center bg-[#ffffff] p-8 border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] w-auto">
        <p className="text-[#264143] font-extrabold text-2xl mb-5">
          Newsletter
        </p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-4">
            <label className="font-semibold mb-1 text-left" htmlFor="name">
              Name
            </label>
            <input
              placeholder="Enter your name"
              id="name"
              autoComplete="name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center mb-4">
            <label className="font-semibold  mb-1" htmlFor="email">
              Enter your email
            </label>
            <input
              placeholder="Enter your email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
              type="email"
            />
          </div>
          <div>
            <button
              type="submit"
              className="py-3 px-4 w-72 text-white bg-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-80 focus:translate-y-1"
            >
              {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="flex font-bold justify-center items-center">
                      Subscribe
                    </div>
                  )}
            </button>
            <p className="text-gray-400 font-semibold mt-4 text-center w-full max-w-[18rem]">
              By subscribing to our newsletter, you agree to receive newsletters
              from Musafir.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
