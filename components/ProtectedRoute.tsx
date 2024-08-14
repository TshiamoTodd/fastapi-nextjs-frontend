'use client'

import React, {useContext, useEffect} from 'react'
import { useRouter } from 'next/navigation'
import AuthContext from '@/app/context/AuthContext'

const ProtectedRoute = ({children}: {children: React.ReactNode}) => {
    const {user} = useContext(AuthContext)
    const router = useRouter()

    useEffect(() => {
        if (!user.access_token) {
            router.push('/login')
        }
    }, [user, router])

    return user ? children : null
}

export default ProtectedRoute