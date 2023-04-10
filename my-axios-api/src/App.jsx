import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Navigation from './Components/Navigation/Navigation.jsx'
import Login from './Components/Login/Login.jsx'
import { useAuthProvider, AuthContext } from './Components/auth/AuthProvider.jsx'

const App = () => {
  const contextValue = useAuthProvider()
  const { isLoggedIn, user } = contextValue
  // todo use isLoggedIn forparameter new routes
  return (
    <AuthContext.Provider value={contextValue}>
      <Navigation />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register user={user} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContext.Provider >
  )
}
export default App;
