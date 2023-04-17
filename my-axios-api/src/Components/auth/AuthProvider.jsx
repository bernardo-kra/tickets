import { useState, createContext, useEffect } from 'react'
import axios from 'axios'
import myRoutes from '../routes/routes'

const AuthContext = createContext()

const useAuthProvider = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(localStorage.getItem('userId') || null)
    const [messageErr, setMessageErr] = useState("")

    const checkLoginStatus = async () => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if (token) {
            try {
                
                await axios.get(`${myRoutes.routeBody}${myRoutes.routeProtect}`, {
                    headers: { Authorization: `${token}` },
                })
                setIsLoggedIn(true)
                setUser(userId)
            } catch (err) {
                localStorage.setItem('userId', null)
                console.error(err)
            }
        }
    }
    useEffect(() => {
        checkLoginStatus()
    }, [])

    const handleLogin = async (credentials) => {
        try {
            const response = await axios.post(`${myRoutes.routeBody}${myRoutes.routeLogin}`, credentials)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.user.id)

            setIsLoggedIn(true)

            setUser(response.data.user.id)
        } catch (err) {
            setMessageErr(err)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(null)
        localStorage.setItem('userId', null)
        localStorage.setItem('token', null)
    }

    return {
        isLoggedIn,
        user,
        messageErr,
        login: handleLogin,
        logout: handleLogout,
    }
}

export { AuthContext, useAuthProvider }
