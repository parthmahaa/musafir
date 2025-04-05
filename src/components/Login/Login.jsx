import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.jsx';
import img1 from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';

function Login() {
  const { setIsAuthenticated, setIsAdmin, setUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem('token', data.authToken);
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('isAdmin', data.isAdmin.toString());
        setIsAuthenticated(true);
        const userData = {
          email: credentials.email,
          name: data.name,
          id: data.id,
          isAdmin: data.isAdmin
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setIsAdmin(data.isAdmin);
        setUser({ email: credentials.email, name: data.name, id: data._id });
        
        if(data.isAdmin){
          navigate('/admin');
        } else {
          navigate('/');
          setTimeout(() => {
            toast.success('Login successful!');
          }, 100);
        }
      }
    } catch (error) {
      const message = error.response?.data?.error || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <section>  
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <Link to="/">
              <div className="h-15 w-50 mb-6 pb-5 md:mb-0">
                <Link to="/" className="flex items-center">
                  <img
                    src={img1}
                    id="logo"
                    className="max-w-23 filter-none max-h-6"
                    alt=""
                  />
                </Link>
              </div>
            </Link>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&#x27;t have an account?{' '}
            <a
              href="/signup"
              title=""
              className="font-semibold text-blue-600 transition-all duration-200 hover:underline"
            >
              Create a free account
            </a>
          </p>
          <form
            action="#"
            method="POST"
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                    type="email"
                    required
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {' '}
                    Password{' '}
                  </label>
                  <a
                    href="/forgot-password"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {' '}
                    Forgot password?{' '}
                  </a>
                </div>
                <div className="mt-2 relative">
                  <input
                    className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={credentials.password}
                    onChange={onChange}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="pt-3">
              <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white transition-all duration-200 hover:bg-black/80 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Log in
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
        </div>
      </div>
    </section>
  );
}

export default Login;
