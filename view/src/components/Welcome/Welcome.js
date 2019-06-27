import React, { useState } from 'react'
import Login from './Login/Login'
import Register from './Register/Register'

export default function Welcome () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [view, setView] = useState('register')
  return (
    <span className={`Welcome__view ${view}`}>
      <Login setView={setView} />
      <Register setView={setView} />
    </span>
  )
}
