import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Contact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);


  let history = useNavigate();

  const sendMail = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try{
      const response = await fetch('https://musafir-4lbu.onrender.com/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: email }),
      });
  
      const json = await response.json();
  
      if (json.success) {
        emailjs
          .sendForm('service_23y8sdp', 'template_1mmca0s', form.current, {
            publicKey: 'ElFYig7j9EWHUIp2x',
          })
          .then(
            () => {
              console.log('Mail sent!');
              toast.success('You have been subscribed',{
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
              });
              history('/');
            },
            (error) => {
              toast.error('Enter a valid mail');
              console.log('FAILED...', error.text);
            }
          );
        console.log('Data sent');
      } else {
        history('/contact-us');
        toast.error('email already exists');
      }
    }catch(e){
      toast.error("Failed to subscribe, try again.")
    }finally{
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        sendMail(event);
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
        <form ref={form} className="w-full" onSubmit={sendMail}>
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
              onClick={sendMail}
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
