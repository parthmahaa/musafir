import React from 'react'
import { useParams } from 'react-router-dom'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function User() {
    const {userid} = useParams()
  return (
    <>
    <div className=' text-center text-purple-400 '>User ID :{userid} </div>
    </>
  )
}

export default User