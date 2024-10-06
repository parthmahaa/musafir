import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Explore from './components/Explore/Explore.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'
import Cafe from './components/Categories/Cafe/Cafe.jsx'
import Malls from './components/Categories/Malls/Malls.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import Historical from './components/Categories/Historical Places/Historical.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="explore" element={<Explore />} />
          <Route path="cafe" element={<Cafe />} />
          <Route path="malls" element={<Malls />} />
          <Route path="historical" element={<Historical />} />
        </Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);