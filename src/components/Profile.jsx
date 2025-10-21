'use client'
import React from 'react'
import PromptCard from './PromptCard'
import toast from 'react-hot-toast'


const ProfilePage = ({name,desc,data,session,isSession}) => {

    const handleDelete = async (post) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this prompt?')
      if(!isConfirmed) return
      try{
        const res = await fetch(`/api/prompt/${post._id}`,{
          method:'DELETE'
        })
        if(res.ok){
          window.location.reload()
          toast.success("Prompt deleted successfully!")
        }
      } catch(error){
          toast.error("Server error!")
          console.log('Error in deleting post',error)
      }
    }
    
  return (
    <section className='mt-6 p-6 w-full'>
        <div>
            <h1 className='text-4xl leading-[1.15] font-extrabold bg-gradient-to-r from-cyan-400 sm:text-5xl to-purple-500 bg-clip-text text-transparent'>{name} Profile</h1>
            <p className='mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl text-left'>{desc}</p>
        </div>

        <h3 className='mt-8 text-lg text-pink-400'>Prompts</h3>

        {data?.length === 0 ? (
          <h2 className='text-gray-500 text-sm mx-8 my-6'>
               No prompts created yet. 
          </h2>
          ) : (<div className='md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-1 mt-8 grid gap-4'>
            {
              data?.map((post,idx) => {
                  return (<PromptCard key={idx} isSession={isSession} session={session} post={post} handleDelete={() => handleDelete(post)}/>)
              })
            }
        </div>)}
    </section>
  )
}

export default ProfilePage
