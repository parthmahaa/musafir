import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Explore from './components/Explore/Explore.jsx'
import LoginPage from './LoginPage.jsx'
import SignupPage from './SignupPage.jsx'


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
          path: 'about',
          element: <About/>
        },
        {
          path: 'explore',
          element: <Explore/>
        }
      ]
    },
    {
      path: '/login',
      element: <LoginPage/>
    },
    {
      path: '/signup',
      element: <SignupPage/>
    }
    
  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)