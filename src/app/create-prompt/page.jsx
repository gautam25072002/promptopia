import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import PromptForm from '@/components/PromptForm'
import { redirect } from 'next/navigation'
import React from 'react'

const CreatePrompt = async () => {
  const session = await auth()
  let isSession = true
  if(!session){
    isSession = false
    redirect('/sign-in')
  }
  return (
    <div>
        <Navbar isSession={isSession} session={session}/>
        <section>
          <div className='p-4'>
            <PromptForm text='Create'/>
          </div>
        </section>
    </div>
  )
}

export default CreatePrompt
