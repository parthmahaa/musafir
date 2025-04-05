import React ,{useState,useContext,useEffect} from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import img1 from '../../assets/logo.png'
import {AuthContext} from '../../Context/AuthContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import api from '../../services/api';

const Signup = () => {
  const { isAuthenticated,setIsAuthenticated ,setUser} = useContext(AuthContext);
  const [credentials, setCredentials] = useState({name:"",email:"", password:""});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let history = useNavigate();
  console.log(isAuthenticated,"singup");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs before making API call
    if (!credentials.name.trim()) {
      setIsLoading(false);
      setTimeout(() => toast.error('Please enter a valid name'), 100);
      return;
    }
    if (!credentials.email.includes('@')) {
      setIsLoading(false);
      setTimeout(() => toast.error('Please enter a valid email'), 100);
      return;
    }
    if (credentials.password.length < 6) {
      setIsLoading(false);
      setTimeout(() => toast.error('Password must be at least 6 characters long'), 100);
      return;
    }

    try {
      const response = await api.post('/auth/signup', {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password
      });

      const data = response.data;

      if (data.success) {
        localStorage.setItem('token', data.authToken);
        localStorage.setItem('email', credentials.email);
        localStorage.setItem('isAdmin', data.isAdmin);
        setUser({ email: credentials.email, name: data.name, id: data._id });
        setIsAuthenticated(true);

        if(data.isAdmin){
          history('/admin');
        } else {
          history('/');
          setTimeout(() => {
            toast.success('Signup successful!');
          }, 100);
        }
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach((err) => {
          setTimeout(() => toast.error(err.msg), 100);
        });
      } else {
        setTimeout(() => toast.error('Signup failed. Please try again.'), 100);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value});
  }
    
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen">
      <div className="h-15 w-50 mb-6 pb-5 md:mb-0">
                        <Link to="/" className="flex items-center">
                        <img src={img1} id="logo" className="max-w-23 filter-none max-h-6" alt="" />
                        </Link>
                    </div>
      <div className="flex flex-col justify-center items-center bg-[#ffffff] p-8 border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] w-auto">
        <p className="text-[#264143] font-extrabold text-2xl mb-5">SIGN UP</p>
        <form className="w-full" action='#' method='POST' onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-4">
            <label className="font-semibold mb-1 text-left" htmlFor="name">Name</label>
            <input 
              placeholder="Enter your full name" 
              id="name"
              name='name'
              value={credentials.name}
              onChange={onChange}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="text"
            />
          </div>
          <div className="flex flex-col items-start mb-4">
            <label className="font-semibold mb-1" htmlFor="email">Email</label>
            <input 
              placeholder="Enter your email" 
              id="email" 
              name='email'
              value={credentials.email}
              onChange={onChange}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="email"
            />
          </div>
          <div className="flex flex-col items-start mb-4">
            <label className="font-semibold mb-1" htmlFor="password">Password</label>
            <div className="relative w-full">
              <input 
                placeholder="Enter your password" 
                id="password" 
                name='password'
                value={credentials.password}
                onChange={onChange}
                className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
                type={showPassword ? "text" : "password"}
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
          <div>
            <button 
              onClick={handleSubmit}
              type="submit" 
              className="py-3 px-4 w-72 text-white bg-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-80 focus:translate-y-1">
              {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      SignUp
                    </div>
                  )}
            </button>
            <p className="mt-4">Have an Account? <a className="font-bold text-[#264143]" href="/login">Login Here!</a></p>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Signup;
