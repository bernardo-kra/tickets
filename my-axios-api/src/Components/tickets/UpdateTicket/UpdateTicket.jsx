import React, { useEffect, useState, useContext } from 'react'
import { useParams, } from 'react-router-dom'
import { useRegisterTickets } from "../formTickets/hooks"
import "../formTickets/FormTickets.css"
function UpdateTicket() {
    const { id } = useParams()

    const {
        handleUpdateSubmit,
        handleSectorChange,
        handleGetTicket,
        handleEventChange,
        handleAddSector,
        handleRemoveSector,
        eventName,
        location,
        date,
        details,
        contact,
        startAt,
        endAt,
        creatorId,
        sector
    } = useRegisterTickets()

    useEffect(() => {
        handleGetTicket(id)
    }, [])


    const handleUpdate = (event) => {
        handleUpdateSubmit(event, id)
    }

    return (
        <form className="form-tickets not-selectable" onSubmit={handleUpdate}>
            <div className="form-tickets-container">
                <div className="form-tickets-column">
                    <label>
                        Event Name:
                        <input
                            type="text"
                            name="eventName"
                            value={eventName.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Location:
                        <input
                            type="text"
                            name="location"
                            value={location.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Date:
                        <input
                            type="date"
                            name="date"
                            value={date.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Details:
                        <textarea
                            name="details"
                            value={details.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                </div>
                <div className="form-tickets-column">

                    <label>
                        Contact:
                        <input
                            type="text"
                            name="contact"
                            value={contact.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        Start Time:
                        <input
                            type="datetime-local"
                            name="startAt"
                            value={startAt.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                    <label>
                        End Time:
                        <input
                            type="datetime-local"
                            name="endAt"
                            value={endAt.value || ''}
                            onChange={handleEventChange}
                        />
                    </label>
                </div>
            </div>
            {sector.value &&
                sector.value.map((sectorItem, index) => (
                    <div className="not-selectable" key={index}>
                        <div className="tickets-section-header">
                            <h3>Sector {index + 1}</h3>
                            <button onClick={(event) => handleRemoveSector(event, index)}>Remove</button>
                        </div>
                        <div className='tickets-form-sector'>
                            <label htmlFor={`sector-${index}-name`}>Name:</label>
                            <input
                                id={`sector-${index}-name`}
                                name={`sector-${index}-name`}
                                type="text"
                                value={sectorItem.name}
                                onChange={(event) => handleSectorChange(index, 'name', event.target.value)}

                            />
                        </div>
                        <div className='tickets-form-sector'>
                            <label htmlFor={`sector-${index}-quantity`}>Quantity:</label>
                            <input
                                id={`sector-${index}-quantity`}
                                name={`sector-${index}-quantity`}
                                type="number"
                                value={sectorItem.quantity}
                                onChange={(event) => handleSectorChange(index, 'quantity', event.target.value)}

                            />
                        </div>
                        <div className='tickets-form-sector'>
                            <label htmlFor={`sector-${index}-value`}>Value:</label>
                            <input
                                id={`sector-${index}-value`}
                                name={`sector-${index}-value`}
                                type="number"
                                value={sectorItem.value}
                                onChange={(event) => handleSectorChange(index, 'value', event.target.value)}

                            />
                        </div>
                    </div>
                ))
            }

            <button onClick={handleAddSector}>Add sector</button>

            <button type="submit">Save Changes</button>
            {/* <button type="button" onClick={returnToTicketsPage}>Cancel</button> */}
        </form>
    )
}

export default UpdateTicket
