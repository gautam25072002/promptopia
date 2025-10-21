import React from 'react'
import GoogleSignIn from '@/components/GoogleSignIn'
import SubmitButton from '@/components/SubmitButton'
import Link from 'next/link'
import {FcGoogle} from 'react-icons/fc'
import { signIn } from '@/auth'

const FormWrapper = ({text}) => {
  return (
    <div className='w-80 flex flex-col gap-4'>
                <h1 className='text-5xl text-center mb-4'>{text}</h1>
                <div className='border-2 px-4 py-3 flex justify-center items-center gap-2 rounded-md'>
                    <FcGoogle size={20}/>
                    <GoogleSignIn/>
                </div>
                <p className='text-center'>OR</p>
                <form className='flex flex-col gap-4 mb-2' action={
                  async (formData) => {
                  'use server'
                  await signIn("credentials",formData)
                }}>
                    <input 
                        type='email' 
                        name='email'
                        className='px-4 py-3 w-full rounded-md border-2 border-gray-200 focus:border-amber-500 focus:outline-none' 
                        placeholder='Enter your email'
                        required
                    />

                    <input 
                        type='password' 
                        name='password'
                        className='px-4 py-3 w-full rounded-md border-2 border-gray-200 focus:border-amber-500 focus:outline-none' 
                        placeholder='Enter your password'
                        required
                    />
                 
                    <SubmitButton type='Sign In' text='Logging in...'/>
                </form>
                
                <p className='text-sm text-gray-600'>
                    Already have an account? {' '}
                    <Link href="/sign-up" className='text-blue-500 hover:underline lg:'>SignUp</Link>
                </p>
            </div>
  )
}

export default FormWrapper
