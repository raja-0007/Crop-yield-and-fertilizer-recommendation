"use client"

import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { TfiEmail } from "react-icons/tfi";
import { LuHistory } from "react-icons/lu";

function page() {
    const [userDetails, setUserDetails] = useState({})
    const [history, setHistory] = useState([])

    useEffect(() => {
        setUserDetails(JSON.parse(sessionStorage.getItem('userdetails'))?.userDetails || '')

    }, [])
    useEffect(() => {
        console.log(userDetails)
        const get_history = async () => {
            console.log(userDetails?.email)
            await axios.get(`http://localhost:7777/api/get_history?email=${userDetails?.email}`)
                .then(res => {
                    console.log(res.data)
                    setHistory(res.data)
                })
        }
        if (userDetails?.email) {
            get_history()

        }
    }, [userDetails])


    return (
        <div>
            <Navbar />
            <section className='w-[75%] flex flex-col mt-10 items-center justify-center mx-auto'>
                <div className='w-full flex items-start justify-between '>
                    <div className='flex flex-col gap-3 items-start justify-center'>
                        <span className='flex gap-2 items-center'>
                            <div className='w-8 h-8 bg-orange-400 border-2 uppercase border-orange-600 text-white flex items-center justify-around text-md font-semibold rounded-full'>
                                {userDetails?.username?.split(' ').length > 1 && userDetails?.username?.split(' ')[0].charAt(0) + userDetails?.username?.split(' ')[1]?.charAt(0) || userDetails?.username?.split(' ')[0].charAt(0)}

                            </div>
                            {userDetails?.username}
                        </span>
                        <span className='flex gap-2 items-center'><TfiEmail className='text-orange-400 text-xl' />{userDetails?.email}</span>
                    </div>
                    <div>
                        <button className='bg-orange-400 text-white px-4 py-2 rounded-md hover:bg-orange-500' onClick={() => {
                            sessionStorage.removeItem('userdetails')
                            window.location.href = '/'
                        }}>Logout</button>
                    </div>

                </div>
                <span className='w-full h-[max-content] mt-8 mb-5 flex gap-1 items-center justify-center border-b-2 border-blue-200 p-2'>
                        <LuHistory className='text-green-300 font-bold text-xl'/><span className='text-gray-600'>recent activity</span></span>
                <div className={`flex flex-col items-start justify-start ${history.length > 0 ? 'h-[63vh] overflow-y-scroll' : 'h-full'}  `}>
                    
                    {history.length > 0 ?
                        history.reverse().map((item, index) => {

                            return (
                                <div className='flex gap-4 items-center bg-gray-100 p-2 mb-2'>
                                    <table className='bg-orange-200 px-2'>
                                        <tr className='bg-white border-4 border-orange-200'>
                                            {Object.keys(item.data).map((item2, index) => {
                                                return (
                                                    <th key={index} className='p-2 w-32'>{item2}</th>
                                                )
                                            })}
                                        </tr>
                                        <tr>
                                            {Object.values(item.data).map((item2, index) => {
                                                return (
                                                    <td key={index} className={`p-2 text-center`}>
                                                        {item2}

                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    </table>
                                    <div className='flex p-1 gap-5 items-center bg-orange-200 rounded-md h-[max-content]'>
                                        <div className='flex h-full flex-col justify-between px-3 gap-2 bg-orange-200 font-medium text-md'>
                                            <span>Yield</span>
                                            <span>Fertilizer</span>
                                            <span>Crop</span>
                                        </div>
                                        <div className='h-full justify-between flex px-3 flex-col gap-2 rounded-md bg-white'>
                                            <span>{item?.prediction?.yield}</span>
                                            <span>{item?.prediction?.fertilizer}</span>
                                            <span>{item?.prediction?.crop}</span>
                                        </div>
                                    </div>
                                </div>

                            )
                        })

                        : 
                        <div className='mt-10'>
                            no history
                        </div>
                        }
                </div>
            </section>
        </div>
    )
}

export default page
