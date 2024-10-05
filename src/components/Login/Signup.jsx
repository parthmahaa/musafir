import React ,{useState} from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import img1 from '../../assets/logo.png'

const Signup = () => {
  const [full_name,setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          await axios.post('http://localhost:5000/api/auth/register', { email, password });
          window.location = '/login'; // Redirect to Login
      } catch (err) {
          setError('Error registering. Please try again.');
      }
  };

    
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-screen">
      <div className="h-15 w-50 mb-6 pb-5 md:mb-0">
                        <Link to="/" className="flex items-center">
                        <img src={img1} id="logo" className="max-w-23 filter-none max-h-6" alt="" />
                        </Link>
                    </div>
      <div className="flex flex-col justify-center items-center bg-[#ffffff] p-8 border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] w-auto">
        <p className="text-[#264143] font-extrabold text-2xl mb-5">SIGN UP</p>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-4">
            <label className="font-semibold mb-1 text-left" htmlFor="name">Name</label>
            <input 
              placeholder="Enter your full name" 
              id="name"
              value={full_name}
              onChange={(e) => setFullName(e.target.value)}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="text"
            />
          </div>
          <div className="flex flex-col items-start mb-4">
            <label className="font-semibold mb-1" htmlFor="email">Email</label>
            <input 
              placeholder="Enter your email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="email"
            />
          </div>
          <div className="flex flex-col items-start mb-4">
            <label className="font-semibold mb-1" htmlFor="password">Password</label>
            <input 
              placeholder="Enter your password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="password"
            />
          </div>
          <div>
            <button 
              type="submit" 
              className="py-3 px-4 w-72 text-white bg-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-80 focus:translate-y-1">
              SIGN UP
            </button>
            <p className="mt-4">Have an Account? <a className="font-bold text-[#264143]" href="/login">Login Here!</a></p>
          </div>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Signup;
