
import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

const PrivateRoute = ({ element }) => {
  const token  = localStorage.getItem('token');
  if (token) {
    return element;
  }else{
    return null;
  }
};

function Layout() {
  return (
    <>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
    </>
  )
}

export default Layout
