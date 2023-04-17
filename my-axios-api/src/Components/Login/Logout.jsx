import React, { useContext } from 'react'
import { AuthContext } from "../auth/AuthProvider"

const Logout = () => {
    const { logout } = useContext(AuthContext)

    return (
        <div onClick={logout}>Logout</div>
    )
}

export default Logout