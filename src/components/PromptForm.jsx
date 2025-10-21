'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const PromptForm = ({text,postData}) => {
    const router = useRouter()
    const [post,setPost] = useState(postData || {prompt:'',tag:''})
    const [submitting,setSubmitting] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
            try{
                setSubmitting(true)
                const url = postData ? `/api/prompt/${postData._id}` : `/api/prompt/create`
                const method = postData ? "PATCH" : "POST"
                const res = await fetch(url,{
                    method,
                    body:JSON.stringify({
                        prompt:post.prompt,
                        tag:post.tag,
                    }),
                    headers:{"Content-Type": "application/json"}
                })
                if(res.ok) {
                    router.push(postData ? '/profile' : '/')
                    if(postData){
                        toast.success("Prompt updated successfully!")
                    }
                    toast.success("Prompt created successfully!")
                }
            } catch(error){
                toast.error("Server error")
                console.log(error)
            } finally{
                setSubmitting(false)
            }
      
    }

  return (
    <div className='w-full max-w-full flex flex-col p-4'>
        <div>
            <h1 className='text-start text-5xl font-bold bg-gradient-to-r from-green-600 to-[#00c8ff] bg-clip-text text-transparent'>{text} Prompt</h1>
            <p className='text-start mt-4 text-lg text-gray-600 sm:text-xl max-w-[945px]'>
                {text} and share amazing prompts with the world, and let your
                imagination run wild with any AI-powered platform
            </p>
        </div>
        <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7'>
            <label htmlFor="prompt">
                <span className='font-satoshi font-semibold text-base text-gray-700'>Your AI Prompt: </span>
                 <textarea
                    id='prompt'
                    value={post.prompt}
                    onChange={(e) => setPost({...post,prompt:e.target.value})}
                    placeholder='Write your post here'
                    required
                    className='w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-400 outline-0 border-2 shadow-lg'
                />
            </label>

            <label htmlFor="tag">
                <span className='font-satoshi font-semibold text-base text-gray-700'>#tag:</span>
                 <input
                    type='text'
                    id='tag'
                    value={post.tag}
                    onChange={(e) => setPost({...post,tag:e.target.value})}
                    placeholder='#product, #webdevelopment, #idea, etc.'
                    required
                    className='w-full flex rounded-lg mt-2 p-3 text-sm text-gray-400 outline-0 border-2 shadow-lg'
                />
            </label>
            <div className='flex flex-col mt-4 mb-5 gap-4 md:flex-row'>
                <button disabled={submitting} className={`px-5 py-2 text-sm ${text === 'Edit' ? 'bg-yellow-400 hover:bg-yellow-500' : 'bg-orange-400 hover:bg-orange-500'} rounded-full md:w-full text-white`} type='submit'>🖊️{submitting ? `${text}ing` : `${text}`}</button>
                <Link href='/' className='text-gray-500 md:w-full text-sm border-2 text-center px-5 py-2 rounded-full'>
                    Cancel
                </Link>
            </div>
        </form>
    </div>
  )
}

export default PromptForm
