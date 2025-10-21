"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import {signOut,getSession} from 'next-auth/react'
import { CiLogout } from "react-icons/ci";
import { IoIosAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdCancel } from "react-icons/md";

const Navbar = ({ serverUser, session}) => {
  const [toggleDropdown,setToggleDropdown] = useState(null)
  const [isHydrated,setIsHydrated] = useState(false)
  const [user,setUser] = useState(serverUser)
  
  const image = session?.user?.image || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'

    useEffect(() => {
      setIsHydrated(true)
      getSession().then((session) => {
        if(session?.user){
          setUser(session.user)
        }
      })
    },[])


    if(!isHydrated){
      return (
        <h1>Loading...</h1>

      )
    }
  return ( 
    <nav className="flex justify-between items-center w-full mb-6 p-4">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image
            src="/promptopia-logo.svg"
            alt="logo"
            width={40}
            height={40}
            className="object-cover"
          />
        </Link>
        <span className="text-2xl font-bold">Promptopia</span>
      </div>
      {user ? (
        <div className="flex justify-center items-center gap-3">
          <div className='hidden md:flex items-center justify-center gap-4'>
            <div>
              <Link href='/profile'>
                <Image src={image} width={40} height={40} alt="login image" title='Profile' className="rounded-full"/>
              </Link>
            </div>
            <div className="border-2 border-amber-600 px-4 py-2 rounded">
              <Link href="/create-prompt" className='flex justify-center items-center gap-[5px]'>
               <IoIosAdd size={25}/>
                Create Prompt
              </Link>
            </div>
            <div className="border-red-600 border-2 px-4 py-2 rounded cursor-pointer">
              <Logout />
            </div>
          </div>
          <div className="sm:flex md:hidden relative">
            <Image src={image} className="rounded-full" title={session?.user.email} width={40} height={40} alt="hamburger" onClick={() => {
                setToggleDropdown((prev) => !prev)
            }}/>

            {toggleDropdown && (
                <div className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-amber-600 min-w-[210px] flex flex-col gap-2 text-white justify-end items-end" onClick={() => setToggleDropdown(false)}>
                        <div>
                          <button className="absolute top-1 right-2 text-black cursor-pointer" onClick={() => setToggleDropdown(false)}><MdCancel size={22}/></button>
                        </div>
                        <Link href='/profile' onClick={() => setToggleDropdown(false)} className='text-md flex items-center justify-center font-inter font-medium gap-[5px] hover:scale-105 transition-transform duration-200 mr-3'>
                            <CgProfile />
                            My profile
                        </Link>
        
                        <Link href='/create-prompt' onClick={() => setToggleDropdown(false)} className='text-md flex items-center justify-center font-inter font-medium gap-[5px] hover:scale-105 transition-transform duration-300 mr-3'>
                            <IoIosAdd size={20}/>
                            Create Prompt
                        </Link>

                        <button className='w-full justify-end flex items-center gap-[5px] text-md hover:scale-105 transition-transform duration-300 mr-3' type="button" onClick={() => {
                            setToggleDropdown(false)
                            signOut();
                        }}> 
                            <CiLogout />
                            Sign Out
                        </button>
                </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <Link
            href="/sign-in"
            className="border-orange-600 border-2 px-4 py-2 rounded"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
