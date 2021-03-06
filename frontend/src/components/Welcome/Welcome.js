import React, { useState, useContext } from 'react'
import Login from './Login/Login'
import ForgotPassword from './ForgotPassword/ForgotPassword'
import Register from './Register/Register'
import Errors from '../Errors/Errors'
import Loader from '../Loader/Loader'
import { AppContext } from '../../AppContext'

export default function Welcome () {
  const [view, setView] = useState('login')
  const context = useContext(AppContext)

  return (
    <>
      {context.loading ? <Loader /> : null}
      <Errors messages={context.errors} />
      <span className={`Welcome__view ${view}`}>
        <ForgotPassword setView={setView} />
        <Login setView={setView} />
        <Register setView={setView} />
      </span>
    </>
  )
}
