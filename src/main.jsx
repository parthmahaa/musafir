import React from 'react'
import { useContext } from 'react';
import ReactDOM from 'react-dom/client'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import './index.css'
import { Navigate } from 'react-router-dom';

//Files
import { WishlistProvider } from './Context/WishlistContext.jsx';
import { AuthProvider, AuthContext } from './Context/AuthContext.jsx'
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
import AdminDashboard from './components/Admin/AdminDashboard.jsx';
import PlanYourTrip from './components/Trip/PlanYourTrip.jsx'
import MyTrips from './components/Trip/MyTrips.jsx'
import Review from './components/Reviews/Review.jsx'
import NotFound from './components/Pages/NotFound.jsx';
import TripList from './components/Trip/TripList.jsx'
import SuggestTrips from './components/Trip/SuggestTrips.jsx'
import Profile from './components/Profile/Profile.jsx';
import ForgetPassword from './components/Login/ForgetPassword.jsx'

const PrivateAdminRoute = ({ element }) => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  return isAuthenticated && isAdmin ? element : <Navigate to="/admin" />;
};

const PrivateRoute = ({ element }) => {
  const token  = localStorage.getItem('token');
  if (token) {
    return element;
  } else {
    toast.error('Please log in to access Plan Your Trip');
    return <NotFound/>
  }
};

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  if (token) {
    alert('You are already logged in');
    return <Navigate to="/" />;
  }
  return element;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={true} // Ensure the newest toast appears on top
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
      limit={1} // Show only one toast at a time
      style={{zIndex: 9999}} // Ensure toasts are always on top
    />
    <Router>
      <AuthProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="explore" element={<Explore />} />
              <Route path="cafe" element={<Cafe />} />
              <Route path="street_food" element={<StreetFood />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="historical_places" element={<Historical />} />
              <Route path="/trip-list" element={<TripList />} />
              <Route path="/suggest-trips" element={<SuggestTrips />} />
              <Route path="/my-trips" element={<MyTrips />} />
              <Route
                path="reviews"
                element={<PrivateRoute element={<Review />} />}
              />
            </Route>            
            <Route path="admin" element={<PrivateAdminRoute element={<AdminDashboard />} />} />
            <Route path="forgot-password" element={<ForgetPassword />} />
            <Route path="plan-your-trip" element={<PrivateRoute element={<PlanYourTrip />} />} />
            <Route path="my-trips" element={<PrivateRoute element={<MyTrips />} />} />
            <Route path="contact-us" element={<ContactUs />} />
            <Route path="login" element={<PublicRoute element={<LoginPage />} />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signup" element={<PublicRoute element={<SignupPage />} />} />
            <Route path="*" element={<NotFound />} /> {/* Fallback route */}
          </Routes>
        </WishlistProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);