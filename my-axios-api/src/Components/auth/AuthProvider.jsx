import { useState, createContext, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const useAuthProvider = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(localStorage.getItem('userId') || null)

    const checkLoginStatus = async () => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')

        if (token) {
            try {
                
                 await axios.get('http://localhost:3001/protegido', {
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
            const response = await axios.post('http://localhost:3001/login', credentials)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('userId', response.data.user.id)

            setIsLoggedIn(true)

            setUser(response.data.user.id)
        } catch (err) {
            console.error(err)
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
        login: handleLogin,
        logout: handleLogout,
    }
}

export { AuthContext, useAuthProvider }
