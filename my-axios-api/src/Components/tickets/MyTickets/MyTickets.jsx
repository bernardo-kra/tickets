import React, { useState, useEffect } from "react"
import axios from "axios"
import "./MyTickets.css"
import { myRoutes } from "../../routes/routes"

function MyTickets() {
    const [tickets, setTickets] = useState([])
    const token = localStorage.getItem('token')

    const fetchTickets = async () => {
        const response = await axios.get(`${myRoutes.routeBody}${myRoutes.routeMyTickets}`, { headers: { Authorization: `${token}` } })
        setTickets(response.data)
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    return (
        <div className="my-tickets-container">
            <h1>My Tickets</h1>
            {tickets.map((ticket, index) => (
                <div className="my-tickets-card" key={index}>
                    <h2 className="my-tickets-title" title={ticket.eventName}>{ticket.eventName}</h2>
                    <p className="my-tickets-date">Date: {ticket.date}</p>
                    <a className="my-tickets-link" href={`${myRoutes.routeMyTicketsId(ticket._id)}`}>
                        See more details
                    </a>
                </div>
            ))}
        </div>
    )
}

export default MyTickets