'use client'
import Link from 'next/link'
import React from 'react'

const EditButton = ({id}) => {
  return (
    <Link key={id} className='bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded cursor-pointer active:scale-95' href={`/update-prompt/${id}`}>
        Edit
    </Link>
  )
}

export default EditButton
