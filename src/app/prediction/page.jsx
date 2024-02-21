"use client"

import Navbar from '@/components/Navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FiRefreshCw } from "react-icons/fi";

function page() {
  const [userdetails, setUserdetails] = useState({})
  const [allFilled, setAllFilled] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [prediction, setPrediction] = useState({})

  let [details, setDetails] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    
  })
  // soil: '',
  //   crop: ''
  function changeHandler(e, item) {
    e.preventDefault()
    // details[item] = e.target.value
    const value = e.target.value
    const numVal = value.replace(/[^0-9]/g, '')
    setDetails({ ...details, [item]: parseInt(numVal) || '' })
  }
  useEffect(() => {
    setUserdetails(JSON.parse(sessionStorage.getItem('userdetails'))?.userDetails || '')
    
  }, [])

  useEffect(() => {
    console.log(details)
    if (Object.values(details).every(item => item !== '')) {
      setAllFilled(true)
    }
    else {
      setAllFilled(false)
    }
  }, [details])

  const submitHandler = async (e) => {
    e.preventDefault()
    console.log(details)
    // const details2 = {
    //   temperature: 10,
    //   humidity: 10,
    //   rainfall: 100,
    //   ph: 2,
    //   nitrogen: 100,
    //   phosphorus: 90,
    //   potassium: 10,
    //   soil: 10,
    //   crop: 10
    // }
    if(allFilled){
      await axios.post('http://localhost:7777/api/prediction', {details:details, email:userdetails.email})
      .then(res => {
        // console.log(res.data[0])
        setPrediction(JSON.parse(res.data[0]))
        setSubmitted(true)
      })
    }
    else{
      console.log('please fill all the details')
    }
    

  }
  return (
    <div>
      <Navbar />
      {submitted ?
        <div className='w-[max-content] flex flex-col items-center justify-center mt-[5%] gap-6 border-4 border-orange-200 rounded-md mx-auto px-8 py-6'>
          <span className='text-2xl font-semibold mb-5 text-blue-400'>Crop Yield and Fertilizer Recommendation</span>

          <table className='bg-orange-200 px-2'>
            <tr className='bg-white border-4 border-orange-200'>
              {Object.keys(details).map((item, index) => {
                return (
                  <th key={index} className='p-2 w-32'>{item}</th>
                )
              })}
            </tr>
            <tr>
              {Object.values(details).map((item, index) => {
                return (
                  <td key={index} className={`p-2 text-center`}>
                    {item}

                  </td>
                )
              })}
            </tr>
          </table>

          <span className='text-lg font-semibold text-blue-400'>Predictions</span>
          <div className='flex p-1 gap-5 items-center bg-orange-200 rounded-md'>
            <div className='flex flex-col px-3 gap-2 bg-orange-200 font-semibold text-lg'>
              <span>Yield</span>
              <span>Fertilizer</span>
              <span>Crop</span>
            </div>
            <div className='h-full flex px-3 flex-col gap-2 rounded-md bg-white'>
              <span>{prediction?.yield}</span>
              <span>{prediction?.fertilizer}</span>
              <span>{prediction?.crop}</span>
            </div>
          </div>
          <button type='button'
            className='p-[7px] bg-green-400 rounded-full hover:bg-green-500 transition-all duration-300'
            onClick={() => {
              setSubmitted(false);
              setDetails({
                temperature: '',
                humidity: '',
                rainfall: '',
                ph: '',
                nitrogen: '',
                phosphorus: '',
                potassium: '',

              })
            }}>
            <FiRefreshCw className='font-bold  text-white hover:rotate-180 transition-all duration-300' size={'1.3em'} />
          </button>
        </div>
        : <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(details)
          }}
          className='w-[max-content] mt-[5%] px-8 py-6 flex flex-col items-center mx-auto gap-3 border-4 border-orange-200 rounded-md'>
          <span className='text-2xl font-semibold mb-5 text-blue-400'>Crop Yield and Fertilizer Recommendation</span>
          <div className='flex  gap-10 bg-orange-200 px-20 py-8 rounded-md'>
            <div className='flex flex-col gap-3'>
              {Object.keys(details).slice(0, 4).map((item, index) => {
                return (
                  <div key={index} className='capitalize flex'>

                    <label htmlFor={item} className='w-28 text-start'>{item}</label>
                    <input
                      type="text"
                      value={details[item]}
                      placeholder={`enter ${item}`}
                      onChange={(e) => changeHandler(e, item)}
                      id={item}
                      required
                      className='outline-none w-60 px-2 py-1 bg-slate-50 rounded-md shadow-sm shadow-gray-300'
                    />
                  </div>
                )
              })}
            </div>
            <div className='flex flex-col gap-3'>
              {Object.keys(details).slice(4, 7).map((item, index) => {
                return (
                  <div key={index} className='capitalize flex'>

                    <label htmlFor={item} className='w-28 text-start'>{item}</label>
                    <input
                      type="text"
                      value={details[item]}
                      placeholder={`enter ${item}`}
                      onChange={(e) => changeHandler(e, item)}
                      id={item}
                      required
                      className='outline-none w-60 px-2 py-1 bg-slate-50 rounded-md shadow-sm shadow-gray-300'
                    />
                  </div>
                )
              })}
            </div>

          </div>

          <button
            type='button'
            onClick={submitHandler}
            className={` px-4 py-2 rounded-md text-white font-semibold bg-blue-400 hover:bg-blue-500 ${allFilled ? '' : 'opacity-50 cursor-not-allowed bg-blue-300'}`}>
            submit
          </button>



        </form>}

    </div>
  )
}

export default page
