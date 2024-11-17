import React ,{useState ,useRef,useEffect} from 'react'
import emailjs from '@emailjs/browser';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function Contact() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const form = useRef() 

    let history = useNavigate()

    const sendMail = async (e) => {
      e.preventDefault();
      
      const response = await fetch("http://localhost:5000/contact-us", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:name, email:email})
      });
  
      const json = await response.json();
  
      if(json.success) {
        emailjs
        .sendForm('service_s0dp77g', 'template_1mmca0s', form.current, {
          publicKey: 'ElFYig7j9EWHUIp2x',
        })
        .then(
          () => {
            console.log('Mail sent!');
            toast.success("you have been subscribed")
            history('/')
          },
          (error) => {
            toast.error("Enter a valid mail")
            console.log('FAILED...', error.text);
          },
        );
        console.log("Data sent");
      } 
      else {
        history('/contact-us')
        toast.error("email already exists")
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
      {/* <div className="h-15 w-50 mb-6 pb-5 md:mb-0">
                        <Link to="/" className="flex items-center">
                        <img src={img1} id="logo" className="max-w-23 filter-none max-h-6" alt="" />
                        </Link>
                    </div> */}
      <div className="flex flex-col justify-center items-center bg-[#ffffff] p-8 border-2 border-[#264143] rounded-2xl shadow-[3px_4px_0px_1px_#E99F4C] w-auto">
        <p className="text-[#264143] font-extrabold text-2xl mb-5">Newsletter</p>
        <form ref={form} className="w-full" onSubmit={sendMail}>
          <div className="flex flex-col items-center mb-4">
            <label className="font-semibold mb-1 text-left" htmlFor="name">Name</label>
            <input 
              placeholder="Enter your name" 
              id="name"
              autoComplete='name'
              name='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="text"
            />
          </div>
          <div className="flex flex-col items-center mb-4">
            <label className="font-semibold  mb-1" htmlFor="email">Enter your email</label>
            <input 
              placeholder="Enter your email" 
              id="email" 
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='email'
              className="outline-none border-2 border-[#264143] shadow-[3px_4px_0px_1px_#E99F4C] w-72 p-3 rounded-md text-sm focus:translate-y-1 focus:shadow-[1px_2px_0px_0px_#E99F4C]" 
              type="email"
            />
          </div>
          <div>
            <button 
            onClick={sendMail}

              type="submit" 
              className="py-3 px-4 w-72 text-white bg-black rounded-lg font-bold text-sm shadow-[3px_3px_0px_0px_#E99F4C] hover:opacity-80 focus:translate-y-1">
              SUBSCRIBE
            </button>
            <p className="text-gray-400 font-semibold mt-4">By subscribing to our newsletter you agree to from Musafir </p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Contact