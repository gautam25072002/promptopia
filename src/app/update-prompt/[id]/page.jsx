import { connectToDB } from '@/app/utils/db'
import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import PromptForm from '@/components/PromptForm'
import Post from '@/models/post'
import { redirect } from 'next/navigation'
import React from 'react'

const Page = async ({params}) => {
  const {id} = await params
  const session = await auth()

  if(!session){
    redirect('/sign-in')
  }
  await connectToDB()
  const data = await Post.findById({_id:id}).populate('creator')
  const plainData = JSON.parse(JSON.stringify(data))
  return (
    <div>
        <Navbar isSession={true} session={session}/>
        <section>
          <div className='p-4'>
            <PromptForm text='Edit' postData={plainData}/>
          </div>
        </section>
    </div>
  )
}

export default Page