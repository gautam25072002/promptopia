import { connectToDB } from '@/app/utils/db'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import ProfilePage from '@/components/Profile'
import Post from '@/models/post'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async ({searchParams,params}) => {
  const name  = await searchParams.name
  const {id} = await params
  const session = await auth()
     let isSession = true
     if(!session){
       isSession = false
       redirect('/sign-in')
     }
      await connectToDB()
      const data = await Post.find({creator:id}).populate('creator')
      const plainData = JSON.parse(JSON.stringify(data))
  return (
    <div>
      <Navbar session={session} isSession={isSession}/>
      <ProfilePage name={name} desc='' data={plainData} session={session} isSession={isSession}/>
    </div>
  )
}

export default page
