'use server'

import axios from "axios"

export const login = async (username: string, password: string) => {
    try {
        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
    
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/token`, formData)
    } catch (error) {
        console.log(error)
    }
}