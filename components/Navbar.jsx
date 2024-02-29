"use client"

import axios from 'axios';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(false)
  const showref = useRef()
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)
  const [userdetails, setUserdetails] = useState({})
  console.log(userdetails);
  let getBgColor = ()=>{
    console.log(pathname)
    if(pathname == '/'){
      return 'hover:text-slate-100 text-slate-300'
    }
    else if(pathname == '/weather'){
      // text-slate-300
      return 'hover:text-slate-100 text-black'
    }
  }
  let getBgColor2 = ()=>{
    if(pathname == '/'){
      return ' text-slate-300'
    }
    else if(pathname == '/weather'){
      // text-slate-300
      return ' text-black'
    }
  }
  useEffect(()=>{
    document.addEventListener('click', (e) => {
      if (showref.current && !showref.current.contains(e.target)) {
        setShow(false)
      }
    })
    setUserdetails(JSON.parse(sessionStorage.getItem('userdetails'))?.userDetails || '')
    
    
  },[])
  

  const logoutHandler = async() => {
    sessionStorage.setItem('userdetails', '{}')
    // window.location.reload()
    router.push('/')
    
  }
  return (
    // bg-gradient-to-tr from-white to-green-100
    <div className='w-full h-[10vh] py-2 z-10 flex justify-between items-center px-10 '>
      <Link href={'/'}  className='cursor-pointer'><img src="/agro-logo-transparent.png" className="w-[125px]" alt=""  /></Link >
      
      {userdetails?.username === undefined ? <div className='flex gap-2'>
        <Link href={'/authentication/login'} className='cursor-pointer text-green-400 px-3 py-1 border-2 border-green-400 hover:bg-green-400 hover:text-white'>Login</Link>

        <Link href={'/authentication/register'} className='cursor-pointer text-green-400 px-3 py-1 border-2 border-green-400 hover:bg-green-400 hover:text-white'>Register</Link>
      </div>
        :
        <span className='flex gap-14 items-center relative  font-medium '>
          <Link href={'/weather'} className={` ${pathname == '/' ?'hover:text-slate-100 text-slate-300':'hover:text-slate-100 text-black'} cursor-pointer transition-all duration-100 hover:scale-[0.95]`}>Weather Updates</Link>
          <Link href={'/prediction'} className={` ${pathname == '/' ?'hover:text-slate-100 text-slate-300':'hover:text-slate-100 text-black'} cursor-pointer transition-all duration-100 hover:scale-[0.95]`}>Prediction</Link>
          {/* <Link href={'/prediction'} className='hover:text-blue-400 cursor-pointer transition-all duration-100 hover:scale-[0.95]'>Fertilizer Recommendation</Link> */}
          <span className={`flex gap-2 items-center ${pathname == '/' ?' text-slate-300':' text-black'}`}>welcome, <span className='font-medium '>{userdetails.username}</span> <span ref={showref}>
            <FaUserCircle className='text-orange-400 text-2xl cursor-pointer' onClick={() => setShow(!show)} />
            <div className={`absolute flex flex-col top-[30px]  w-[max-content] h-[max-content]  right-0 bg-zinc-50 rounded-md overflow-hidden  shadow-md shadow-gray-200 ${show ? '' : 'hidden'}`}>
              <Link href={'/profile'} className='px-8 py-1 hover:bg-green-300 hover:text-white cursor-pointer'>profile</Link>
              <span className='px-8 py-1 hover:bg-green-300 hover:text-white border-t-2 border-zinc-100 cursor-pointer' onClick={logoutHandler}>Logout</span>
            </div>
          </span></span>
          

        </span>

      }

    </div>
  )
}

export default Navbar
