'use client'
import { Google } from '@/actions/googleSignIn'
import React from 'react'

const GoogleSignIn = () => {
  return (
    <form action={Google}>
        <button type='submit'>
            SignIn with Google
        </button>
    </form>
  )
}

export default GoogleSignIn
