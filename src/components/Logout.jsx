'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/sign-in' })
  }

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout