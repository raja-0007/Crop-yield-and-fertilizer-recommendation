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
  const [loading, setLoading] = useState(false)

  let [details, setDetails] = useState({
    temperature: '',
    humidity: '',
    rainfall: '',
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',

  })
  let units = {
    temperature: ['°c', '35', 8, 43],
    humidity: ['%', '68', 14, 100],
    rainfall: ['mm', '90', 20, 299],
    ph: ['pH', '5.5', 3.5, 9.4],
    nitrogen: ['kg/ha', '120', 0, 140],
    phosphorus: ['kg/ha', '112', 5, 145],
    potassium: ['kg/ha', '180', 5, 205],
  }
  // soil: '',
  //   crop: ''
  function changeHandler(e, item) {
    e.preventDefault()
    // details[item] = e.target.value
    const value = e.target.value
    const numVal = value.replace(/[^0-9.]/g, '')
    // console.log(numVal)
    if (numVal >= 0 && numVal <= units[item][3]) {
      setDetails({ ...details, [item]: numVal })
    }

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
    if (allFilled) {
      setLoading(!loading)
      await axios.post('http://localhost:7777/api/prediction', { details: details, email: userdetails.email })
        .then(res => {
          // console.log(res.data[0])
          setPrediction(JSON.parse(res.data[0]))
          setSubmitted(true)
        })
    }
    else {
      console.log('please fill all the details')
    }


  }
  return (
    <div>
      <Navbar />
      {submitted ?
        <div className='w-[max-content] flex flex-col items-center justify-center mt-[5%] gap-6 border-4 border-orange-200 rounded-md mx-auto px-8 py-6 shadow-gray-400 shadow-lg'>
          <span className='text-2xl font-semibold mb-5 text-blue-400'>Crop Yield and Fertilizer Recommendation</span>

          <table className='bg-orange-200 px-2'>
            <tr className='bg-white border-4 border-orange-200'>
              {Object.keys(details).map((item, index) => {
                return (
                  <th key={index} className='p-2 w-32'>{item} <br /><span className='text-sm font-light'>({units[item][0]})</span></th>
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
              setLoading(false)
              
            }}>
            <FiRefreshCw className='font-bold  text-white hover:rotate-180 transition-all duration-300' size={'1.3em'} />
          </button>
        </div>
        : <form
          onSubmit={(e) => {
            e.preventDefault()
            console.log(details)
          }}
          className='w-[max-content] mt-[5%] px-8 py-6 flex flex-col items-center mx-auto gap-3 border-4 border-orange-200 rounded-md shadow-gray-200 shadow-lg'>
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
                      placeholder={`eg. ${units[item][1]} ${units[item][0]}`}
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
                      placeholder={`eg. ${units[item][1]} ${units[item][0]}`}
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
            className={` w-20 h-8 rounded-md flex items-center justify-center text-white font-semibold bg-blue-400 hover:bg-blue-500 ${allFilled ? 'shadow-md shadow-gray-400' : 'opacity-50 cursor-not-allowed bg-blue-300 '}`}>
            {loading ? 
            <div role="status">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
              <span class="sr-only">Loading...</span>
            </div> : 'submit'}
          </button>



        </form>}

    </div>
  )
}

export default page
