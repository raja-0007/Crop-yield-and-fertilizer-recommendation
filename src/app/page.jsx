"use client"

import Navbar from "@/components/Navbar";

import { motion } from "framer-motion"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Home() {
  const router = useRouter()
  const [userdetails, setUserdetails] = useState({})
  useEffect(()=>{
    
    
    setUserdetails(JSON.parse(sessionStorage.getItem('userdetails'))?.userDetails || '')
    
  },[])

  useEffect(()=>{
    console.log(userdetails)
    
  },[userdetails])
   
  
  
  return (
    <div className={`w-full min-h-screen flex flex-col bg-gray-50`}>
      <Navbar userdetails={userdetails} />
      <div className="mx-auto flex flex-col justify-center items-center gap-5 py-12 mt-20 z-10 relative">
        <motion.h2
          initial={{ top: '0px', left:'120px'}}
          animate={{ top: '0px', right:'', left:'' }}
          transition={{ duration: 0.8 }}
          className="w-[max-content] font-bold text-3xl text-blue-500 absolute">Crop Yield And Fertilizer Recommendation</motion.h2>
        <motion.span
          initial={{opacity:0.1}}
          animate={{ opacity:1 }}
          transition={{ duration: 2 }}
         className="text-center text-gray-500 text-md">
          <p>
            Get started to know the crop yield of your land
            and get the best fertilizer recommendation by
            just submitting brief details of your land.
          </p>
          <p>
            Make use of the strong machine learning algorithms
            to get the best results.
          </p>
        </motion.span>

        <motion.button
          onClick={()=>router.push(`${userdetails?.username === undefined ? '/authentication/login' : '/prediction' }`)}
          initial={{ bottom: '-30px', right:'350px'}}
          animate={{ bottom: '-30px', right:'', left:'' }}
          transition={{ duration: 0.8 }}
          className="px-9 py-4 absolute w-[max-content] bg-gradient-to-br from-blue-400 to-green-400 hover:from-green-400 hover:to-blue-400 rounded-md text-white font-bold">
          Get started
        </motion.button>


      </div>
      <img src="/rural rice field.png" className="w-full absolute bottom-0 z-0" alt="" />

    </div>
  );
}
