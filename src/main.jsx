import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import './index.css'

//Files
import { WishlistProvider } from './Context/WishlistContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx'
import Layout from './components/Pages/Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Explore from './components/Explore/Explore.jsx'
import LoginPage from './components/Pages/LoginPage.jsx'
import SignupPage from './components/Pages/SignupPage.jsx'
import Cafe from './components/Categories/Cafe/Cafe.jsx'
import StreetFood from './components/Categories/StreeFood/StreetFood.jsx'
import Historical from './components/Categories/Historical Places/Historical.jsx'
import Wishlist from './components/Wishlist/Wishlist.jsx'
import ContactUs from './components/Pages/ContactUs.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <WishlistProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="explore" element={<Explore />} />
          <Route path="cafe" element={<Cafe />} />
          <Route path="street_food" element={<StreetFood/>} />
          <Route path="historical_places" element={<Historical />} />
          <Route path="wishlist" element={<Wishlist/>} />
        </Route>
        <Route path="contact-us" element={<ContactUs/>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
      </WishlistProvider>
      </AuthProvider>
    </Router>
    <ToastContainer
    position="top-center"
    autoClose={1000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="light"
    />
  </React.StrictMode>
);