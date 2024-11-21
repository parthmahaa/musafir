  import React,{useState,useContext,useEffect} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext.jsx'
import img1 from '../../assets/logo.png'
import { ToastContainer,toast } from 'react-toastify';

function Login() {
  const { setIsAuthenticated} = useContext(AuthContext);
  const [credentials, setCredentials] = useState({email:"", password:""});

  let history = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch("https://musafir-4lbu.onrender.com/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email,password: credentials.password})
    });

    const json = await response.json();
    
    if(json.success) {
      // save the auth token and redirect
      localStorage.setItem('token',json.authToken);
      localStorage.setItem('email', credentials.email)
      setIsAuthenticated(true);
      toast.success("Successfully Logged In");
      history("/");
      
    } else {
      toast.error("Invalid Credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials,[e.target.name]: e.target.value});
  }
  

  return (
    <section>
  <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <div className="mb-2 flex justify-center">
        <Link to='/'>
        <div className="h-15 w-50 mb-6 pb-5 md:mb-0">
                        <Link to="/" className="flex items-center">
                        <img src={img1} id="logo" className="max-w-23 filter-none max-h-6" alt="" />
                        </Link>
                    </div>
      </Link>
      </div>
      <h2 className="text-center text-2xl font-bold leading-tight text-black">
        Sign in to your account
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 ">
        Don&#x27;t have an account?{" "}
        <a
          href="/signup"
          title=""
          className="font-semibold text-black transition-all duration-200 hover:underline"
        >
          Create a free account
        </a>
      </p>
      <form action="#" method="POST" onSubmit={handleSubmit} className="mt-8">
        <div className="space-y-5">
          <div>
            <label htmlFor="" className="text-base font-medium text-gray-900">
              {" "}
              Email address{" "}
            </label>
            <div className="mt-2">
              <input
                className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                type="email"
                required
                name='email'
                value={credentials.email}
                onChange={onChange}
                placeholder="Email"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-base font-medium text-gray-900">
                {" "}
                Password{" "}
              </label>
              <a
                href="#"
                title=""
                className="text-sm font-semibold text-black hover:underline"
              >
                {" "}
                Forgot password?{" "}
              </a>
            </div>
            <div className="mt-2">
              <input
                className="flex outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-full p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]"
                type="password"
                name='password'
                required
                value={credentials.password}
                onChange={onChange}
                placeholder="Password"
              />
            </div>
          </div>
          <div className='pt-3'>
            <button
              type="submit"
              onClick={handleSubmit}
              className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
            >
              Log in{" "}
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
            </button>
          </div>
        </div>
      </form>
      
    </div>
  </div>
</section>

  )
}

export default Login