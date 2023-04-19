import React, { useContext } from 'react'
import { AuthContext } from "../auth/AuthProvider"

const Logout = () => {
    const { logout } = useContext(AuthContext)

    return (
        <div onClick={logout}>Sair</div>
    )
}

export default Logout