import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import Login from './components/Login/Login'


function LoginPage() {
  return (
    <>
    <Login/>
    <Footer />
    </>
  )
}

export default LoginPage