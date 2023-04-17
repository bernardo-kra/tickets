import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home.jsx'
import Register from './Components/Register/Register.jsx'
import Navigation from './Components/Navigation/Navigation.jsx'
import Login from './Components/Login/Login.jsx'
import { useAuthProvider, AuthContext } from './Components/auth/AuthProvider.jsx'
import FormTickets from "./Components/tickets/formTickets/FormTickets.jsx"
import Calendar from './Components/Calendar/Calendar.jsx'
import TicketDetails from './Components/tickets/TicketDetails/TicketDetails.jsx'
import "./index.css"
import MyTickets from './Components/tickets/MyTickets/MyTickets.jsx'
import UpdateTicket from './Components/tickets/UpdateTicket/UpdateTicket.jsx'

const App = () => {
  const contextValue = useAuthProvider()
  const { isLoggedIn, user } = contextValue
  // todo use isLoggedIn forparameter new routes
  return (
    <AuthContext.Provider value={contextValue}>
      <Navigation />
      <Routes>
        <Route path="/tickets/:id" element={<TicketDetails />} />
        <Route path="/my-tickets/:id" element={<UpdateTicket />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/" element={<Calendar></Calendar>}/>
        <Route path="/home" element={<TicketDetails/>} />
        <Route path='create-tickets' element={<FormTickets></FormTickets>}/>
        <Route path="/register" element={<Register user={user} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthContext.Provider >
  )
}
export default App;
