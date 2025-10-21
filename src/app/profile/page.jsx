import React from 'react'
import ProfilePage from  '@/components/Profile'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import { redirect } from 'next/navigation'
import Post from '@/models/post'
import { connectToDB } from '../utils/db'

const Profile = async () => {
 const session = await auth()
   let isSession = true
   if(!session){
     isSession = false
     redirect('/sign-in')
   }
  await connectToDB()
  const data = await Post.find({creator:session.user.id}).populate('creator')
  const plainData = JSON.parse(JSON.stringify(data))
 
  
  return (
    <div>
      <Navbar session={session} isSession={isSession}/>
      <ProfilePage name='My' desc='Welcome to your personalized profile page' data={plainData} session={session} isSession={isSession}/>
    </div>
  )
}

export default Profile
