import React from 'react'
import { Link } from 'react-router-dom'
import svg from '../components/assets/404.svg'

export const NotFound = () => {
  return (
    <>
      <div className="w-screen flex flex-col items-center justify-center">
        <img src={svg} alt="svg" />
        <Link to="/" className="absolute mt-4 bg-blue-500 hover:bg-blue-700 text-white text-3xl font-bold py-10 px-10 rounded">
          Back to Dashboard
        </Link>
      </div>
    </>
  )
}