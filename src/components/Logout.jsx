'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {
    const router = useRouter()
    const handleLogout = async () => {
        await signOut()
        router.push('/sign-up')
    }
  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout
