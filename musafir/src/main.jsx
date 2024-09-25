import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Blogs from './components/Blogs/Blogs.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPage from './LoginPage.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '',
          element: <Home/>
        },
        {
          path: '/about',
          element: <About/>
        },
        {
          path: '/blogs',
          element: <Blogs/>
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage/>
    }
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)