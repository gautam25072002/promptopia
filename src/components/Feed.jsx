'use client'
import React, { useEffect, useState } from 'react'
import PromptCardList from './PromptCardList'

const Feed = ({session}) => {
  const [search,setSearch] = useState('')
  const [posts,setPosts] = useState([])
  const [filteredPrompts,setFilteredPrompts] = useState([])
  const [loading,setLoading] = useState(true)
  
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/prompt')
      const data = await res.json()
      setPosts(data)
    } 
    fetchPosts()
    setLoading(false)
    
  },[])
  
  // filter logic
  const handleSearch = (e) => {
    e.preventDefault()
    const regex = new RegExp(search,"i")
    const filtered = posts.filter((item) => regex.test(item.prompt) || regex.test(item.tag) || regex.test(item.creator.name))
    setFilteredPrompts(filtered)
  }
  return (
    <section className='flex flex-col justify-center items-center gap-y-8'>
        <form className='flex justify-center w-[400px] items-center space-4' onSubmit={handleSearch}>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search for a tag or a username...' className='w-full rounded-md bg-transparent py-3 mt-8 pl-5 pr-14 text-sm border-2 font-medium shadow-md border-gray-600 outline-none focus:ring-0 focus:shadow-amber-600'/>
          <button type='submit' className='flex justify-center items-center bg-amber-500 px-5 cursor-pointer ml-3 py-2 mt-8 rounded-md hover:bg-amber-600 active:scale-95'>
            Search
          </button>
        </form>
        
        {loading ? (<p className='text-center text-gray-500 mt-8 text-xl'>Loading prompts...</p>) : (
          <div className='mt-10 grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 xl:grid-cols-4 sm:gap-6 space-y-6 py-8'>
             <PromptCardList postData={posts} session={session} setFilteredPrompts={setFilteredPrompts} filteredPrompts={filteredPrompts} search={search} setSearch={setSearch}/>
         </div>)}
    </section>
  )
}

export default Feed
