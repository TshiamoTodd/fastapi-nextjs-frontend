'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export const AuthContext = createContext(
    {
        user: {access_token: '', token_type: ''},
        login: async (username: string, password: string) => {}, 
        logout: () => {}
    }
)

interface AuthProviderProps {
    children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserType>({ access_token: '', token_type: '' })
  const router = useRouter()

  const login = async (username: string, password: string) => {
    try {
        console.log({username, password})
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL as string}auth/token`, formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
        localStorage.setItem('token', response.data.access_token)
        setUser(response.data)
        router.push('/')

    } catch (error) {
      console.log('Login Failed',error)
        
    }
  }

  const logout = () => {
    setUser({ access_token: '', token_type: '' })
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem('token')
    router.push('/login')
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}


export default AuthProvider