'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import EditButton from './EditButton'

const PromptCard = ({post,session,isSession,handleDelete,search,setSearch,handleTagClick}) => {
    const image = post.creator.image ? (post.creator.image) : 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    const [copied,setCopied] = useState('')
    const router = useRouter()

    const handleCopy = () => {
        setCopied(post.prompt);
        navigator.clipboard.writeText(post.prompt);
        setTimeout(() => setCopied(false), 3000);
    };

    const handleProfileClick = () => {
        if(post.creator._id === session?.user.id) return router.push("/profile");
        router.push(`/profile/${post.creator._id}?name=${post.creator.name}`);
    }

  return (
    <div className='bg-transparent w-[400px] h-[250px] p-4 rounded-lg border-2 border-gray-700 md:w-[300px] md:h-[240px] hover:scale-110 transition-all duration-300 hover:shadow-[0px_4px_10px_rgba(25,25,25,0.8)] shadow overflow-hidden'>
        <div className='flex justify-between items-center'>
            <div className='flex justify-start items-center gap-2'>
                <Image src={image} width={35} height={35} alt="user image" className='rounded-full object-contain cursor-pointer' onClick={handleProfileClick}/>
                <div className='flex flex-col'>
                    <h2 className='text-md md:text-sm'>{post.creator.name}</h2>
                    <p className='text-sm text-gray-600 tracking-wide'>{post.creator.email}</p>
                </div>
            </div>
            <div onClick={handleCopy} className='cursor-pointer'>
                <Image
                    src={
                        copied === post.prompt
                        ? "/tick.svg"
                        : "/copy.svg"
                    }
                    alt={copied === post.prompt ? "tick" : "copy"}
                    width={16}
                    height={16}
                    title='copy'
                />
            </div>
        </div>
     <div className='flex flex-col overflow-y-auto no-scrollbar h-30 p-2'>
         <p className='mt-3 text-xl tracking-wide text-gray-500 ml-2 text-md md:text-sm'>{post.prompt}</p>
      
         <p className='my-3 ml-2 text-sm text-blue-600 cursor-pointer' onClick={() => handleTagClick(post)}>{post.tag}</p>
     </div>
      
      
      {(isSession && session.user.id === post?.creator._id) ? (
        <div className='flex justify-between items-center mt-3'>
            <button className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded cursor-pointer active:scale-95' onClick={() => handleDelete(post)}>Delete</button>
            <EditButton id={post._id}/>
        </div>
      ) : ''}
    </div>
  )
}

export default PromptCard
