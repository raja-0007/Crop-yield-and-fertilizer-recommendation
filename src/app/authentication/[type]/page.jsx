"use client"


import Navbar from '@/components/Navbar';
import axios from 'axios';
import { Emilys_Candy } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { FaRegCircleUser } from "react-icons/fa6";

function Authentication({ params }) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState({})
  const [isEmail, setIsEmail] = useState(false)
  const [isPword, setIsPword] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [isEmail2, setIsEmail2] = useState(false)
  const [isPword2, setIsPword2] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rEmail, setREmail] = useState('')
  const [username, setUsername] = useState('')
  const [rPassword, setRPassword] = useState('')
  const emailref = useRef(null)
  const pwordref = useRef(null)
  const userref = useRef(null)
  const emailref2 = useRef(null)
  const pwordref2 = useRef(null)
  // const [userdetails, setUserdetails] = useState({})
  const changeHandler = (e, num) => {
    switch (num) {
      case 1:
        setEmail(e.target.value)
        break;
      case 2:
        setPassword(e.target.value)

      default:
        break;
    }
  }
  const changeHandler2 = (e, num) => {
    switch (num) {
      case 1:
        setUsername(e.target.value)
        break;
      case 2:
        setREmail(e.target.value)
        break;
      case 3:
        setRPassword(e.target.value)

      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (emailref.current && !emailref.current.contains(e.target) && emailref.current.children[1].value === '') setIsEmail(false)

      if (pwordref.current && !pwordref.current.contains(e.target) && pwordref.current.children[1].value === '') setIsPword(false)

      if (emailref2.current && !emailref2.current.contains(e.target) && emailref2.current.children[1].value === '') setIsEmail2(false)

      if (pwordref2.current && !pwordref2.current.contains(e.target) && pwordref2.current.children[1].value === '') setIsPword2(false)

      if (userref.current && !userref.current.contains(e.target) && userref.current.children[1].value === '') setIsUser(false)




    })


    // setUserdetails(JSON.parse(sessionStorage.getItem('userdetails'))?.userDetails || '')

  }, [])

  useEffect(() => {
    console.log(email)
  }, [email])

  const makeLogin = async () => {
    console.log(email, password)
    if (email === '' || password === '') {
      alert('please enter all fields')
      return
    }
    await axios.post('http://localhost:7777/api/authorization', { email: email, password: password, action: 'login' })
      .then(console.log('req sent'))
      .then(res => { console.log(res.data); setIsLoggedIn(res.data) })

      .catch(err => console.log('error in sending request', err))
  }

  const makeRegister = async () => {

    console.log(username, rEmail, rPassword)
    if (username === '' || rEmail === '' || rPassword === '') {
      alert('please enter all fields')
      return
    }
    await axios.post('http://localhost:7777/api/authorization', { username: username, email: rEmail, password: rPassword, action: 'register' })
      .then(res => setIsLoggedIn(res.data))
      .catch(err => console.log('error in sending request', err))


  }
  useEffect(() => {

    console.log(params.type, isLoggedIn)
    if (params.type === 'login') {
      if (isLoggedIn.status === 'authorised') {
        sessionStorage.setItem('userdetails', JSON.stringify(isLoggedIn))

        router.push('/')
      }
      else if (isLoggedIn.status === false) alert('please register to login')
      else if (isLoggedIn.status === 'unauthorised') alert('wrong email and password combination')
    }
    else if (params.type === 'register') {
      if (isLoggedIn.status === 'success') {
        console.log('new user reg success and pushing to /')
        sessionStorage.setItem('userdetails', JSON.stringify(isLoggedIn))
        router.push('/')
      }
      else if (isLoggedIn.status === 'already exists') alert('email already exists')
    }

  }, [isLoggedIn])

  return (
    <div className='h-full'>
      <Navbar/>
      <div className='w-full py-12 flex items-center justify-center'>
        {params.type == 'login' ?
          <div className='p-5 flex flex-col items-center justify-center gap-4'>

            <span className='self-start text-md font-bold'>login to your account</span>
            <span className='flex flex-col gap-2 justify-center items-center'>
              <FaRegCircleUser className='text-7xl text-green-500' />
              <span className='text-sm text-gray-500 text-center'>
                <p>
                  welcome to Agro
                </p>
                <p className='font-semibold text-blue-300 '>
                  Crop Yield and Fertilizer Recommendation
                </p>
              </span>

            </span>

            <form className='flex flex-col gap-4'>

              <span ref={emailref} className='border-[1px] border-black px-3 flex flex-col cursor-text h-[60px] w-[300px] justify-center relative' onClick={() => { setIsEmail(true) }}>
                <label
                  htmlFor='email'
                  className={`font-semibold cursor-text transition-all ease-in-out duration-300 absolute ${isEmail ? 'text-sm text-blue-500 transform -translate-y-[30px] left-1 bg-white px-2' : 'text-md top-auto left-5 bottom-auto text-black'}`} >
                  Email</label>

                <input type="email"
                  value={email}
                  onChange={(e) => changeHandler(e, 1)}
                  // ${isEmail ? '' : 'hidden'}
                  className={`outline-none transition-all duration-200 ease-in-out h-full`} name="name1" id="email" />

              </span>
              <span ref={pwordref} className='border-[1px] border-black p-1 px-3 flex flex-col cursor-text h-[60px] w-[300px] justify-center relative' onClick={() => setIsPword(true)}>
                <label htmlFor='password' className={`font-semibold cursor-text transition-all ease-in-out absolute duration-300  ${isPword ? 'text-sm text-blue-500 transform -translate-y-[30px]  left-1 bg-white px-2' : 'text-md top-auto left-5 bottom-auto text-black'}`}>password</label>
                <input type="password"
                  value={password}
                  onChange={(e) => changeHandler(e, 2)}
                  className={`outline-none transition-all duration-200 ease-in-out h-full`} name="" id="password" />

              </span>
              <button type='button' className='w-full bg-green-300 text-center text-white font-semibold py-2 mt-1 hover:bg-green-400 transition-all duration-100' onClick={makeLogin}>Login</button>
            </form>

            <span>are you a new user? <Link href={'/authentication/register'} className='text-red-500 underline-offset-2 underline'>click here to register</Link></span>
          </div>
          :
          <div className='p-5 flex flex-col items-center justify-center gap-4'>

            <span className='self-start text-md font-bold'>register to skillshere</span>
            <span className='flex flex-col gap-2 justify-center items-center'>
              <FaRegCircleUser className='text-7xl text-violet-500' />
              <span className='text-sm text-gray-500 text-center'>
                <p>
                  welcome to Agro
                </p>
                <p className='font-semibold text-blue-300 '>
                  Crop Yield and Fertilizer Recommendation
                </p>
              </span>
            </span>

            <form className='flex flex-col gap-4'>
              <span ref={userref} className='border-[1px] border-black p-1 px-3 flex flex-col cursor-text h-[60px] w-[300px] justify-center relative' onClick={() => { setIsUser(true) }}>
                <label htmlFor='username' className={`font-semibold cursor-text transition-all ease-in-out duration-300 absolute ${isUser ? 'text-sm text-blue-500 transform -translate-y-[30px]  left-1 bg-white px-2' : 'text-md top-auto left-5 bottom-auto text-black'}`}>username</label>
                <input type="text"
                  value={username}
                  onChange={(e) => changeHandler2(e, 1)}
                  className={`outline-none transition-all duration-200 ease-in-out h-full`} name="" id="username" />

              </span>
              <span ref={emailref2} className='border-[1px] border-black p-1 px-3 flex flex-col cursor-text h-[60px] w-[300px] justify-center relative' onClick={() => { setIsEmail2(true) }}>
                <label htmlFor='email2' className={`font-semibold cursor-text transition-all ease-in-out duration-300 absolute ${isEmail2 ? 'text-sm text-blue-500 transform -translate-y-[30px]  left-1 bg-white px-2' : 'text-md top-auto left-5 bottom-auto text-black'}`}>email</label>
                <input type="email"
                  value={rEmail}
                  onChange={(e) => changeHandler2(e, 2)}
                  className={`outline-none transition-all duration-200 ease-in-out h-full`} name="" id="email2" />

              </span>
              <span ref={pwordref2} className='border-[1px] border-black p-1 px-3 flex flex-col cursor-text h-[60px] w-[300px] justify-center relative' onClick={() => setIsPword2(true)}>
                <label htmlFor='password2' className={`font-semibold cursor-text transition-all ease-in-out duration-300 absolute ${isPword2 ? 'text-sm text-blue-500 transform -translate-y-[30px]  left-1 bg-white px-2' : 'text-md top-auto left-5 bottom-auto text-black'}`}>password</label>
                <input type="password"
                  value={rPassword}
                  onChange={(e) => changeHandler2(e, 3)}
                  className={`outline-none transition-all duration-200 ease-in-out h-full`} name="" id="password2" />

              </span>
              <button type='button' className='w-full bg-green-300 text-white font-semibold text-center py-2 mt-1 hover:bg-green-400 transition-all duration-100' onClick={makeRegister}>register</button>
            </form>
            <span>already a user? <Link href={'/authentication/login'} className='text-red-500 underline-offset-2 underline'>click here to login</Link></span>

          </div>
        }
      </div>

    </div>
  )
}

export default Authentication
