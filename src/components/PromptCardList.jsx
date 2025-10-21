import React from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({postData,session,filteredPrompts,search,setSearch,setFilteredPrompts}) => {
   const handleTagClick = (post) => {
        search = post.tag
        setSearch(search)
        const regex = new RegExp(search,'i')
        const tagFiltered = postData.filter((item) => regex.test(item.tag))
        setFilteredPrompts(tagFiltered)
    }
  return (
    <>
      {(filteredPrompts.length > 0 ? filteredPrompts : postData).map((post) => (
             <PromptCard key={post._id} post={post} session={session} search={search} setSearch={setSearch} handleTagClick={() => handleTagClick(post)}/>
      ))}
    </>
  )
}

export default PromptCardList
