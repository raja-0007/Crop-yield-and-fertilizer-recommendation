import React from 'react'
import { AiTwotoneClockCircle } from "react-icons/ai";
import { CiClock2 } from "react-icons/ci";

function Hourly({ forecast, loading, time }) {
    console.log(typeof forecast, forecast)
    let skel = [1, 2, 3, 4, 5,6,7]

    if (loading) {
        return (
            <>

                {skel.map((item, index) => {
                    return (

                        <>
                            <div key={index} className='w-[160px] h-[120px] p-3 flex justify-between  items-center  bg-opacity-20 '>
                                <div className='w-[50px] flex h-[50px] bg-gray-400 animate-pulse text-sm rounded-s-md rounded-e-md'>

                                </div>

                                <div className='h-full w-[max-content] text-end flex flex-col justify-around items-end self-end gap-2'>
                                    <div className='animate-pulse w-[40px] h-[15px] bg-gray-400 rounded-full'></div>
                                    <div className='animate-pulse w-[60px] h-[15px] bg-gray-400 rounded-full'></div>
                                    <div className='animate-pulse w-[50px] h-[15px] bg-gray-400 rounded-full'></div>
                                </div>



                            </div>
                            {index !== 6 && index !== skel.length - 1 && <hr className='h-[75%] my-auto w-[2px] bg-white' />}

                        </>
                    )
                })}


            </>

        )
    }
    return (
        <>
            {forecast[0]?.hour.filter(hour => parseInt(hour.time.split(' ')[1].slice(0, 2)) > parseInt(time.slice(0, 2))).slice(0, 7).map((day, ind) => {
                //${ind !== 4 && 'border-e-2 border-white'}
                return (
                    <>
                        <div key={ind} className={`w-[180px] p-3 flex justify-between  items-center     `}>
                            <div className='w-full flex h-full items-center justify-center'>
                                <img src={day.condition.icon} className='w-[50px] self-center' alt="" />
                            </div>

                            <div className='h-full w-[max-content] text-end flex flex-col justify-between items-end self-end gap-2'>
                                <span className='flex items-center text-gray-500 text-sm'> {day.time.split(' ')[1]} <CiClock2  size={'1em'} /> </span>
                                <span className='font-semibold'>{day.temp_c}&deg;C</span>
                                <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>
                            </div>



                        </div>
                        {ind !== 6  &&  <hr className='h-[75%] my-auto w-[2px] bg-white' />}
                        {/* ||  ind !== forecast[0]?.hour.length - 1 */}
                    </>

                )

            })}
        </>

    )
}

export default Hourly
