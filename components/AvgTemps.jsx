import React from 'react'

function AvgTemps({ forecast, loading, getDay }) {
    console.log(typeof forecast)
    if (loading) {
        return (<>
        <div className='self-center bg-blue-200 rounded-md font-semibold p-1 px-2 mt-2 mb-1'>Average Temperatures</div>
            <div className='w-full  p-3 flex justify-between  items-center    '>
                <div className='w-[max-content] flex flex-col h-full items-center justify-between gap-2'>

                    <div className='w-[40px] h-[40px] bg-gray-400 rounded-lg animate-pulse self-center ' />
                </div>

                <div className='h-full w-full flex flex-col justify-between items-end  gap-2'>
                    <div className='bg-gray-400 w-[60px] rounded-full h-[20px] animate-pulse'></div>
                    <div className='bg-gray-400 w-[40px] rounded-full h-[20px] animate-pulse'></div>
                    {/* <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>*/}
                </div>



            </div>
            <hr className='border-white border-[1px] w-[75%] mx-auto' />
            <div className='w-full  p-3 flex justify-between  items-center    '>
                <div className='w-[max-content] flex flex-col h-full items-center justify-between gap-2'>

                    <div className='w-[40px] h-[40px] bg-gray-400 rounded-lg animate-pulse self-center ' />
                </div>

                <div className='h-full w-full text-end flex flex-col justify-between  items-end gap-2'>
                    <div className='bg-gray-400 w-[60px] rounded-full h-[20px] animate-pulse'></div>
                    <div className='bg-gray-400 w-[40px] rounded-full h-[20px] animate-pulse'></div>
                    {/* <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>*/}
                </div>



            </div>
            <hr className='border-white border-[1px] w-[75%] mx-auto' />
            <div className='w-full  p-3 flex justify-between  items-center    '>
                <div className='w-[max-content] flex flex-col h-full items-center justify-between gap-2'>

                    <div className='w-[40px] h-[40px] bg-gray-400 rounded-lg animate-pulse self-center ' />
                </div>

                <div className='h-full w-full text-end flex flex-col justify-between  items-end gap-2'>
                    <div className='bg-gray-400 w-[60px] rounded-full h-[20px] animate-pulse'></div>
                    <div className='bg-gray-400 w-[40px] rounded-full h-[20px] animate-pulse'></div>
                    {/* <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>*/}
                </div>



            </div>
           

        </>)
    }
    return (
        <>
            <div className='self-center  bg-blue-200 rounded-md font-semibold p-1 px-2 mt-2 mb-1'>Average Temperatures</div>
            <div className='w-full  p-3 flex justify-between  items-center    '>
                <div className='w-[max-content] flex flex-col h-full items-center justify-between gap-2'>

                    <img src={forecast[0]?.day.condition.icon} className='w-[80px] self-center ' alt="ion" />
                </div>

                <div className='h-full w-full text-end flex flex-col justify-between  gap-2'>
                    <span className='text-sm font-medium text-gray-500'>Today</span>
                    <span className='font-semibold'>{forecast[1]?.day.avgtemp_c}&deg;C</span>
                    {/* <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>*/}
                </div>



            </div>
            <hr className='border-white border-[1px] w-[75%] mx-auto' />
            <div className='w-full  p-3 flex justify-between  items-center    '>
                <div className='w-[max-content] flex flex-col h-full  justify-between gap-2'>

                    <img src={forecast[1]?.day.condition.icon} className='w-[80px] self-center ' alt="ion" />
                </div>

                <div className='h-full w-full text-end flex flex-col justify-between items-end  gap-2'>
                    <span className='text-sm font-medium text-gray-500'>Tomorrow</span>
                    <span className='font-semibold'>{forecast[1]?.day.avgtemp_c}&deg;C</span>
                    {/* <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>*/}
                </div>



            </div>
            <hr className='border-white border-[1px] w-[75%] mx-auto' />
            <div className='w-full  p-3 flex justify-between  items-center   '>
                <div className='w-[max-content] flex flex-col h-full  justify-between gap-2'>

                    <img src={forecast[2]?.day.condition.icon} className='w-[80px] self-center ' alt="ion" />
                </div>

                <div className='h-full w-full text-end flex flex-col justify-between  gap-2'>
                    <span className='text-sm font-medium text-gray-500'>{getDay(forecast[2]?.date)}</span>
                    <span className='font-semibold'>{forecast[2]?.day.avgtemp_c}&deg;C</span>
                    {/* <span>{day.condition.text.split(' ').length > 1 ? day.condition.text.split(' ')[0] + ' ' + day.condition.text.split(' ')[1] : day.condition.text}</span>*/}
                </div>



            </div>

        </>
    )
}

export default AvgTemps
